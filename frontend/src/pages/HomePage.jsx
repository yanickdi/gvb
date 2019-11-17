import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
  return <div>
    <ul>
      <li><Link to="/location/uni">Uni</Link></li>
    </ul>
  </div>;
};

export default HomePage;