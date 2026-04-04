import { IonContent,IonIcon, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import RoomCard from '../../components/RoomCard/RoomCard';
import Header from '../../components/header/Header';
import Room1Image from '../../assets/images/Room1.jpeg';
import Room2Image from '../../assets/images/Room2.jpeg';
import { heartSharp, locationOutline,notificationsOutline, homeOutline, navigate } from 'ionicons/icons';
import './Home.css';
import Pretoria from "../../assets/images/pretoria.png";
import PMB from "../../assets/images/pietermaritzburg.png";

const rooms = [
  {
    image: Room1Image,
    title: '2-Bedroom Flat',
    address: 'KwaMashu, Durban',
    price: 'R1500 / month',
    rules: ['No noise', '2 people max', 'Bring own bed linen'],
    isSaved: true,
  },
  {
    image: Room2Image,
    title: 'Single Room',
    address: 'Inanda, Durban',
    price: 'R900 / month',
    rules: ['No pets', '1 person only'],
    isSaved: false,
  },
  {
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    title: "Bachelor Room",
    address: "Umlazi, Durban",
    price: "R800 / month",
    rules: ["No loud music", "1 person only", "No smoking"],
    isSaved: false,
  },
  {
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    title: "Student Room",
    address: "Westville, Durban",
    price: "R1200 / month",
    rules: ["Students preferred", "No parties", "Clean shared bathroom"],
    isSaved: true,
  },
  {
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    title: "Modern Studio",
    address: "Durban Central",
    price: "R2500 / month",
    rules: ["No pets", "Electricity excluded", "2 people max"],
    isSaved: false,
  },
  {
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    title: "Shared Apartment Room",
    address: "Pinetown, Durban",
    price: "R1000 / month",
    rules: ["Share kitchen", "No noise after 10PM"],
    isSaved: true,
  },
  {
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    title: "Furnished Room",
    address: "Phoenix, Durban",
    price: "R1700 / month",
    rules: ["No smoking", "Couples allowed"],
    isSaved: false,
  },
  {
    image: "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b",
    title: "Luxury Bedroom",
    address: "Umhlanga, Durban",
    price: "R3500 / month",
    rules: ["Secure parking", "No pets", "Deposit required"],
    isSaved: false,
  },
  {
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    title: "Simple Room",
    address: "KwaMashu, Durban",
    price: "R700 / month",
    rules: ["No visitors overnight", "1 person only"],
    isSaved: true,
  }

];

const cities = [
  {
    name: "Durban",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99"
  },
  {
    name: "Cape Town",
    image: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e"
  },
  {
    name: "Johannesburg",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99"
  },
   {
  
    name: "Pretoria",
    image: Pretoria
  },
  {
    name: "Pietermaritzburg",
    image: PMB
  }

];
const Home: React.FC = () => {
   
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="home-container">

<Header
  user={{
    firstName: "Nduduzo",
    gender: "female",
    location: "Durban, KZN",
    newListings: 3,
    photo: null,
  }}
  // onAvatarClick={() => navigate("/profile")}
/>


 <span className="city-title">
    Find affordable rooms near...
  </span>
        
<div className="city-section">

 

  <div className="city-slider">
    {cities.map((city, index) => (
      <div className="city-card" key={index}>

        <img src={city.image} alt={city.name} />

        <span className="city-name">
          {city.name}
        </span>

      </div>
    ))}

  </div>

</div>

<div className="section-divider">Available Rooms</div>


          {rooms.map((room, index) => (
            <RoomCard
              key={index}
              image={room?.image} 
              title={room.title}
              address={room.address}
              price={room.price}
              rules={room.rules}
              isSaved={room.isSaved}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
