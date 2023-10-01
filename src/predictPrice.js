const np = require('numpy');
const plt = require('matplotlib.pyplot');
const pd = require('pandas');

// Read the CSV dataset
const dataset = pd.read_csv('data.csv');
console.log(dataset.head());

// Extract input and output variables
const X = dataset.iloc[:, 1:2].values;
const y = dataset.iloc[:, -1].values;

// Linear Regression
const { LinearRegression } = require('sklearn.linear_model');
const lin_reg = new LinearRegression();
lin_reg.fit(X, y);

// Polynomial Regression
const { PolynomialFeatures } = require('sklearn.preprocessing');
const poly_reg = new PolynomialFeatures({ degree: 2 });
const X_poly = poly_reg.fit_transform(X);
const lin_reg_2 = new LinearRegression();
lin_reg_2.fit(X_poly, y);

// Plotting with Linear Regression
plt.scatter(X, y, { color: 'red' });
plt.plot(X, lin_reg.predict(X), { color: 'blue' });
plt.title('Price according to energy supply using Linear Regression');
plt.xlabel('Energy supply');
plt.ylabel('Price');
plt.show();

// Plotting with Polynomial Regression
plt.scatter(X, y, { color: 'red' });
plt.plot(X, lin_reg_2.predict(poly_reg.fit_transform(X)), { color: 'blue' });
plt.title('Price according to energy supply using Polynomial Regression');
plt.xlabel('Energy supply');
plt.ylabel('Price');
plt.show();

// Predicting with Linear Regression
const x = lin_reg.predict([[6342]]);
console.log(x);

// Predicting with Polynomial Regression
const y = lin_reg_2.predict(poly_reg.fit_transform([[6342]]));
console.log(y);

// Calculating the minimum value
const minimum_value = np.minimum(x, y);
console.log("Optimum price is:", minimum_value);
