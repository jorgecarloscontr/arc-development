import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import theme from './ui/Theme';
import Header from './ui/header';
import Footer from './ui/Footer';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          value={value}
          setValue={setValue}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <div style={{ minHeight: '100vh' }}>Home</div>}
          />
          <Route
            exact
            path="/services"
            component={() => <div style={{ height: '2000px' }}>Services</div>}
          />
          <Route
            exact
            path="/customsoftware"
            component={() => <div>Custom Software</div>}
          />
          <Route
            exact
            path="/mobileapps"
            component={() => <div>Mobile Apps</div>}
          />
          <Route exact path="/websites" component={() => <div>Websites</div>} />
          <Route
            exact
            path="/revolution"
            component={() => <div>The revolution</div>}
          />
          <Route exact path="/about" component={() => <div>About US</div>} />
          <Route exact path="/contact" component={() => <div>Contact</div>} />
          <Route exact path="/estimate" component={() => <div>Estimate</div>} />
        </Switch>
        <Footer setSelectedIndex={setSelectedIndex} setValue={setValue} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
