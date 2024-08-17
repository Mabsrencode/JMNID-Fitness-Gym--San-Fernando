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
};
