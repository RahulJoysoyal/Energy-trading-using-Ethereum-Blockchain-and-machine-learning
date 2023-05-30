//SPDX-License-Identifier:GPL-3.0
pragma solidity 0.8.13;

contract owned {
constructor() { owner = msg. sender; }
address owner;
modifier onlyOwner {
	require(msg.sender == owner);
	_;
}


event consumerRegistered(address indexed consumer);
event consumerDeregistered (address indexed consumer);

// map address to userID
mapping(address => uint32) public consumers;

modifier onlyRegisteredConsumers {
require (consumers[msg. sender] > 0);
_;
}

//I Allowed the owner of the address aconsumer.address()
//to make transactions on behalf of user id "auserID*
//Register address aconsumer to belong to userID
//auserID. Addresses can be delisted ("unregistered") by 
//setting the userID auserID to zero.
function registerConsumer (address aconsumer, uint32 auserID) onlyOwner external {
if (auserID != 0) {
emit consumerRegistered(aconsumer);
} else {
emit consumerDeregistered (aconsumer);
}
consumers [aconsumer] = auserID;
}

// A contract that allows producer addresses to be registered.

event producerRegistered(address indexed producer);//44
event producerDeregistered (address indexed producer);
//map address to producerID "is a registered producer" 
mapping(address => uint) public producers;////////////
mapping(address => uint) internal userEnergyBal;/////////////

modifier onlyRegisteredProducers {
require (producers[msg. sender]>0);
_;
}
//// @notice Allow the owner of address aproducer.(address) to
//act as a producer (by offering energy).
function registerProducer(address bproducer,uint buserID, uint buserEnergyBal) onlyOwner external {
emit producerRegistered(bproducer);
require(buserID>0);//////////////
producers [bproducer] = buserID;///////////
/////////\\\\\\\
userEnergyBal [bproducer] = buserEnergyBal;///////////\\\\\\\\\\
/////////\\\\\\\\
////@note ID can not be zero
}

////@notice Cease alLowing the owner of address
//aproducer. Address()' to act as a producer (by offering energy).
function deregisterProducer (address bproducer) onlyOwner external {
emit producerDeregistered(bproducer);
delete(producers[bproducer]);////////////
}



event BidMade(address indexed producer, uint32 indexed day, uint32 indexed price, uint64 energy); 
event BidRevoked (address indexed producer, uint32 indexed day, uint32 indexed price, uint64 energy);
event Deal (address indexed producer, uint32 indexed day, uint32 price, uint64 energy, uint32 indexed userID);
event DealRevoked (address indexed producer, uint32 indexed day, uint32 price, uint64 energy, uint32 indexed userID); //77

//78
uint64 constant mWh = 1;
uint64 constant Wh = 1000*mWh;
uint64 constant kWh = 1000 * Wh;
uint64 constant MWh = 1000 * kWh;
uint64 constant GWh = 1000 * MWh;
uint64 constant TWh = 1000 * GWh;
uint64 constant maxEnergy = 18446 * GWh;

struct Bid {
    //producer's public key
    address producer;
    
    //day for which the offer is valid
    uint32 day;

     //price vs market price
     uint32 maxprice;
     uint32 minprice;

     //energy to sell
     uint64 maxenergy;
     uint64 minenergy;

     //timestamp for when the offer was submitted
     uint64 timestamp;
}

struct Ask {
    address producer;
    uint32 day; 
    uint32 price; 
    uint64 energy; 
    uint32 userID; 
    uint64 timestamp;
}

//bids (for energy: offering energy for sale)
Bid[] private bids;

//asks (for energy: demanding energy to buy)
Ask[] public asks;

//map (address, day) to index into bids 
//maps a producer's public key and the day for which the offer is valid 
//to the index of the corresponding Bid object in the bids array.
mapping (address => mapping(uint32 => uint)) private bidsIndex;

//map (userid) to index into asks [last take written]
//maps a user ID to the index of the corresponding Ask object in the asks array.
mapping (uint32 => uint) public asksIndex;

//aday Day for which the offer is valid.
//aprice price surcharge in millicent/kwh above market price
//aenergy Energy to be offered in mwh
//atimestamp UNIX time (seconds since 1970) in nanoseconds
function offer_energy (uint32 aday, uint32 apriceMax, uint32 apriceMin, uint64 amaxenergy, uint64 aminenergy, uint64 atimestamp) onlyRegisteredProducers external {
//require a minimum offer of 1 kWh
require (aminenergy >= kWh);

uint idx = bidsIndex[msg.sender][aday];
//idx is either 0 or such that bids[idx] has the right producer and day (or both 0 and...) 

//if the bids array's length is greater than index number and the address at that index is a producer
//and the day the address bid 
if ((bids.length > idx) && (bids[idx].producer == msg.sender) && (bids[idx].day == aday))
{
//we will only let newer timestamps affect the stored data i.e. unix timestamp
require(atimestamp > bids[idx].timestamp);
emit BidRevoked(bids[idx].producer, bids[idx].day, bids[idx].maxprice, bids[idx].maxenergy);
}
// create entry with new index idx for (msg. sender, aday)
idx = bids.length;////by this the mapping index starts from 1 not zero
bidsIndex[msg.sender][aday] = idx;
bids.push(Bid({
    producer: msg.sender, 
    day: aday, 
    maxprice: apriceMax,
    minprice: apriceMin,
    minenergy: aminenergy,
    maxenergy: amaxenergy, 
    timestamp: atimestamp
}));
emit BidMade(bids[idx].producer, bids[idx].day, bids[idx].maxprice, bids[idx].maxenergy) ;
}

//can see the bids by giving the index number of the bids array
function showBids (uint idx) onlyRegisteredConsumers public view returns (address producer,uint32 day,uint32 maxprice,uint64 energy,uint64 timestamp){
    return (bids[idx].producer, bids[idx].day, bids[idx].maxprice, bids[idx].maxenergy, bids[idx].timestamp) ;
}

//can get the bids by giving the address and day
// Anyone call this function, he'll retrieve all data without minimum price value.
function getBidByProducerAndDay(address aproducer, uint32 aday) external view returns(address producer,uint32 day,uint32 maxprice,uint64 energy,uint64 timestamp) {
    uint idx = bidsIndex[aproducer][aday];
    return (bids[idx].producer, bids[idx].day, bids[idx].maxprice, bids[idx].maxenergy, bids[idx].timestamp) ;
}

//the minimum value of any bid can be seen by a producer
// Restrict access only producer to access the minimum price of a specific address in a mapping
function getMinPrice(uint32 aday) onlyRegisteredProducers external view returns(uint32) {
    uint idx = bidsIndex[msg.sender][aday];
    return (bids[idx].minprice);
}

function getBidsCount () external view returns (uint count) {
return bids.length;
}

/////////////////
// called by the user id provided by the owner and called by owner on behalf pf consumer
// function buy_energy (address aproducer, uint32 aday, uint32 aprice, uint64 aenergy, uint32 auserID, uint64 atimestamp) onlyOwner external{
// buy_energy_core(aproducer, aday, aprice, aenergy, auserID, atimestamp);
// }
////////////////

//// aproducer Address of the producer offering the energy
///to be bought.
///aday Day for which the offer is valid.
/// aprice Price surcharge in millicent/kwh above market
////price
////aenergy Energy to be offered in mwh

//called by the id that is got from the consumers map and called by the consumer itself
function buy_energy (address aproducer, uint32 aday, uint32 aprice, uint64 aenergy) onlyRegisteredConsumers external payable {
buy_energy_core(aproducer, aday, aprice, aenergy, consumers[msg. sender], 0);
}

function buy_energy_core(address aproducer, uint32 aday, uint32 aprice, uint64 aenergy, uint32 auserID, uint64 atimestamp) internal {
//find offer by producer (aproducer) for day (aday), or zero
uint idx = bidsIndex[aproducer][aday];

//if the offer exists...
if ((bids.length > idx) && (bids [idx].producer == aproducer) && (bids [idx].day == aday)) {
//…and has the right price...
require(bids[idx].maxprice >=aprice && bids[idx].minprice<=aprice);
require(bids[idx].maxenergy >=aenergy && bids[idx].minprice<=aenergy);

// todo: prevent overwriting a later choice..

//...then record the customer's choice
asksIndex[auserID] = asks.length;//by this the mapping index starts from 1 not zero
asks.push(Ask({
producer: aproducer, 
day: aday, 
price: aprice, 
energy: aenergy, 
userID: auserID,
timestamp: atimestamp
}));
emit Deal (aproducer, aday, aprice, aenergy, auserID);
///////////////
// address payable payableRecipient = payable(aproducer);
// payable(payableRecipient).transfer(10);
sendEthUser(aproducer);
//////////////////////
delete(bidsIndex[aproducer][aday]);
} else {
//the offer does not exist
revert();
}
}

function sendEthUser(address _user) private {
       payable(_user).transfer(2000000000000000000);
    }

function getAsksCount () external view returns (uint count) {
return asks.length;
}

function getAskUserID(uint32 userID) external view returns(address producer, uint32 day, uint32 price, uint64 energy) {
uint idx = asksIndex[userID];
require(asks[idx].userID == userID);
return (asks[idx].producer, asks[idx].day, asks[idx].price, asks[idx].energy);
}

}