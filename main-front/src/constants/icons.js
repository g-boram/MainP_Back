// user_icons
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoPawSharp } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoUmbrella } from "react-icons/io5";
import { IoRocketSharp } from "react-icons/io5";
import { IoPlanet } from "react-icons/io5";
import { IoNutrition } from "react-icons/io5";
import { IoHappy } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoDiamond } from "react-icons/io5";

// car_icons
import { TfiMapAlt } from "react-icons/tfi";
import { HiOutlineTicket } from "react-icons/hi2";
import { GiCarSeat } from "react-icons/gi";
import { FaCarOn } from "react-icons/fa6";
import { FaCarBurst } from "react-icons/fa6";
import { FaCarTunnel } from "react-icons/fa6";
import { GiMusicalNotes } from "react-icons/gi";
import { FaKeycdn } from "react-icons/fa6";
import { FaUsb } from "react-icons/fa6";
import { ImDisplay } from "react-icons/im";

// user_icons
export const icons = [
  { name: "user", iconComp: <IoPersonCircleOutline /> },
  { name: "dog", iconComp: <IoPawSharp /> },
  { name: "moon", iconComp: <IoMoon /> },
  { name: "music", iconComp: <IoMusicalNotesSharp /> },
  { name: "bell", iconComp: <IoNotifications /> },
  { name: "umb", iconComp: <IoUmbrella /> },
  { name: "rocket", iconComp: <IoRocketSharp /> },
  { name: "plant", iconComp: <IoPlanet /> },
  { name: "apple", iconComp: <IoNutrition /> },
  { name: "happy", iconComp: <IoHappy /> },
  { name: "heart", iconComp: <IoHeartSharp /> },
  { name: "dia", iconComp: <IoDiamond /> },
];

export const carIcons = [
  { icon: <TfiMapAlt size={25} />, value: "네비게이션" },
  { icon: <HiOutlineTicket size={25} />, value: "하이패스" },
  { icon: <GiCarSeat size={25} />, value: "열선시트" },
  { icon: <FaCarOn size={25} />, value: "썬루프" },
  { icon: <FaKeycdn size={25} />, value: "스마트키" },
  { icon: <FaCarBurst size={25} />, value: "경보시스템" },
  { icon: <GiMusicalNotes size={25} />, value: "스피커" },
  { icon: <FaUsb size={25} />, value: "USB" },
  { icon: <ImDisplay size={25} />, value: "디스플레이" },
  { icon: <FaCarTunnel size={25} />, value: "스마트컨트롤" },
];
