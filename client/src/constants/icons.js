import {
  FaMessage,
  FaXmark,
  FaFacebook,
  FaInstagram,
  FaGoogle,
} from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
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

export {
  MessageIcon,
  XMarkIcon,
  BurgerIcon,
  FaceBookIcon,
  InstagramIcon,
  GoogleIcon,
};
