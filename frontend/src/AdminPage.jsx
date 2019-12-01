import React from 'react';
import {Link} from "react-router-dom";

class AdminPage extends React.Component {
  render() {
    return <div className="admin">
      <div className="sidenav">
        <a href="/admin/locations">Standorte verwalten</a>
        <Link to='/logout'>Logout</Link>
      </div>
      <div className="main-container">
        <h1>Fahrpläne verwalten</h1>
        <div className="content-section">
          <h2>Meine Standorte</h2>
          <p>some blub</p>
        </div>
      </div>
    </div>
  }
}

export default AdminPage;