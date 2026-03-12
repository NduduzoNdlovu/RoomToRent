import React from 'react';
import { IonCard, IonCardHeader,IonButton, IonCardContent, IonCardTitle, IonCardSubtitle, IonImg, IonBadge, IonIcon } from '@ionic/react';
import { heartSharp, locationOutline, homeOutline } from 'ionicons/icons';
import './RoomCard.css';

interface RoomCardProps {
  image: string;
  title: string;
  address: string;
  price: string;
  rules: string[];
  isSaved?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ image, title, address, price, rules, isSaved }) => {
  return (
     <IonCard className="room-card">
      <IonImg src={image} alt={title} className="card-bg-image" />
      <div className="card-overlay">
          <div className="price-save">
            <span className="price">{price}</span>
            <IonIcon icon={heartSharp} className={`save-icon ${isSaved ? 'saved' : ''}`} />
          </div>
        {/* <IonCardContent> */}
        <div className="custom-title">
            <div className="room">
                <IonIcon icon={homeOutline}></IonIcon>   <span>{title}</span>
            </div>
            <div className="location">
                <IonIcon icon ={locationOutline}></IonIcon><span>{address}</span>
            </div>
        </div>
        <div className="badge-button-container">
          <div className="rules">
            {rules.map((rule, i) => (
              <IonBadge key={i}>{rule}</IonBadge>
            ))}
          </div>
            <a className="button-view"> View Room</a>

          </div>
          {/* <IonButton expand="block"> View Room</IonButton> */}
        {/* </IonCardContent> */}
      </div>
    </IonCard>
  );
};

export default RoomCard;