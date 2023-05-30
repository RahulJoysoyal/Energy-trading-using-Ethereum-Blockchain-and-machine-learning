import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,Legend,Label} from 'recharts';
import "./index.css";
import { Link } from 'react-router-dom';

function Chart() {
    const data = [
        {
          "timestamp": "1685373563",
          "use": 1.057961944,
          "generation": 0.000839167
        },
        {
          "timestamp": "1685373629",
          "use": 0.620940833,
          "generation": 0.001225
        },
        {
          "timestamp": "1685373695",
          "use": 0.6182375,
          "generation": 0.001189444
        },
        {
          "timestamp": "1685373750",
          "use": 0.502353333,
          "generation": 0.001731944
        }
      ]
    return(
        <>
        <h1>Graphical analysis of energy trading</h1>
        <div className='chart'>
            <AreaChart width={500} height={320} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="coloruse" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorgeneration" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="timestamp">
  <Label value="timestamp" offset={0} position="insideBottom" />
  </XAxis>
  <YAxis>
  <Label value="amount of energy" angle={-90} offset={0} position="Left" />
  </YAxis>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="bottom" height={36}/>
  <Area type="monotone" dataKey="use" stroke="#8884d8" fillOpacity={1} fill="url(#coloruse)" />
  <Area type="monotone" dataKey="generation" stroke="#82ca9d" fillOpacity={1} fill="url(#colorgeneration)" />
</AreaChart>
</div>
<div className='connected-container2'>
<Link  to="/connected"><button className='login-button'>Go back</button></Link>
</div>
        </>
    );
}

export default Chart;