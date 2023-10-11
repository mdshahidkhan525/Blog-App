import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function SearchPost() {
  const [isSearch, setSearchQuery] = useState(false);
return (
  <div className='container'>
    <div className="input-box">
      <input type="search" name="search-form" id="search-form" className="search-input" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Post"/>
    </div>
  </div>
)
}
