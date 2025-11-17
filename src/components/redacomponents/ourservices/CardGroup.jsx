
import React from 'react'

import "./CardGroup.css"
import Card from './Card';

export default function CardGroup() {
  return (
    
    <section className="card-group-wrapper">
      <div className="card-group">
        <Card iconSrc="/icons/hall.png" title="The Best wedding Halls"></Card>
        <Card iconSrc="/icons/search.png" title="searching/filtering by localistaion and price"></Card>
        <Card iconSrc="/icons/business1.png" title="Business Development"></Card>
        <Card  className ="derniere"  title="Advertisement of your wedding halls">+ many offers</Card>
      </div>
    </section>
  );
}