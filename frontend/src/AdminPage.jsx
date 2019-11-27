import React from 'react';
import {Link} from "react-router-dom";

class AdminPage extends React.Component {
  render() {
    return <div><p>This is the admin page.</p><p>
      <Link to='/logout'>Logout</Link>
    </p></div>
  }
}

export default AdminPage;