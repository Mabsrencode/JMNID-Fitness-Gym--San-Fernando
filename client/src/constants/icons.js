import {
  FaMessage,
  FaXmark,
  FaFacebook,
  FaInstagram,
  FaGoogle,
  FaLinkedin,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowBack } from "react-icons/io";
import { BiFoodMenu } from "react-icons/bi";
import { PiBarbellBold } from "react-icons/pi";
import { IoBarbell } from "react-icons/io5";
const MessageIcon = ({ className }) => {
  return <FaMessage className={className} />;
};

const XMarkIcon = ({ className }) => {
  return <FaXmark className={className} />;
};

const BurgerIcon = ({ className }) => {
  return <RxHamburgerMenu className={className} />;
};

const FaceBookIcon = ({ className }) => {
  return <FaFacebook className={className} />;
};

const InstagramIcon = ({ className }) => {
  return <FaInstagram className={className} />;
};

const GoogleIcon = ({ className }) => {
  return <FaGoogle className={className} />;
};

const LinkedInIcon = ({ className }) => {
  return <FaLinkedin className={className} />;
};

const TwitterIcon = ({ className }) => {
  return <FaTwitter className={className} />;
};
const ArrowRightIcon = ({ className }) => {
  return <FaArrowRight className={className} />;
};

const ArrowLeftNavIcon = ({ className }) => {
  return <IoIosArrowBack className={className} />;
};
const FoodMenuIcon = ({ className }) => {
  return <BiFoodMenu className={className} />;
};
const BarbelIcon = ({ className }) => {
  return <PiBarbellBold className={className} />;
};
const LightBarbelIcon = ({ className }) => {
  return <IoBarbell className={className} />;
};
export {
  MessageIcon,
  XMarkIcon,
  BurgerIcon,
  FaceBookIcon,
  InstagramIcon,
  GoogleIcon,
  LinkedInIcon,
  TwitterIcon,
  ArrowRightIcon,
  ArrowLeftNavIcon,
  FoodMenuIcon,
  BarbelIcon,
  LightBarbelIcon,
};
