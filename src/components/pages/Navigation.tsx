"use client";

import { Button } from "../ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "../../hooks/use-mobile";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex w-full h-[72px] px-4 md:px-16 flex-col justify-center items-center bg-white border-b border-black relative">
      <div className="flex justify-between items-center w-full max-w-[1280px]">
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-black z-50 md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              <div className="flex justify-center items-center py-2">
                <span className="text-black text-base font-normal leading-[150%]">Home</span>
              </div>
              <div className="flex justify-center items-center py-2">
                <span className="text-black text-base font-normal leading-[150%]">Features</span>
              </div>
              <div className="flex justify-center items-center py-2">
                <span className="text-black text-base font-normal leading-[150%]">Pricing</span>
              </div>
              <div className="flex justify-center items-center py-2">
                <span className="text-black text-base font-normal leading-[150%]">Support</span>
              </div>

            </div>
          </div>
        )}
        {/* Logo */}
        <div className="flex items-start">
          <div className="md:hidden">
            <Button
              variant={"outline"}
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
          <div className="flex w-[84px] h-9 px-[7.333px] justify-center items-center">
            <svg
              width="70"
              height="36"
              viewBox="0 0 71 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[70px] h-9 flex-shrink-0"
            >
              <g clipPath="url(#clip0_9203_9427)">
                <path
                  d="M67.9112 17.0815L67.8741 17.1187C68.1343 16.4125 68.6546 16.1523 69.1006 16.1523C69.7325 16.1523 70.29 16.6355 70.29 17.3417C70.29 17.4904 70.29 17.6762 70.2157 17.8992C68.9148 21.2444 66.1643 22.9541 63.4882 23.2143C62.2617 25.2957 60.2546 26.8196 57.3926 26.8196C53.3041 26.8196 51.4829 23.586 51.4829 20.055C51.4829 15.7063 54.2334 10.8744 58.8422 10.8744C59.8457 10.8744 60.7006 11.0975 61.4068 11.3948C63.4882 12.1753 64.8263 14.8886 64.8263 17.7877C64.8263 18.7169 64.7519 19.6461 64.5289 20.5382C65.9042 20.055 67.205 18.9399 67.9112 17.0815ZM60.1431 13.9222V13.8851C59.3254 13.8851 58.8422 14.9629 58.8422 16.2638C58.8422 18.1594 59.8829 19.9063 61.5183 20.5382C61.7785 19.7205 61.89 18.7913 61.89 17.7134C61.89 15.632 61.2581 13.9222 60.1431 13.9222ZM57.4298 24.1063C58.4705 24.1063 59.5112 23.6603 60.3289 22.7311C57.913 21.6532 56.3891 19.1258 56.3891 16.7098C56.3891 15.8921 56.5378 15.0373 56.7608 14.2939C55.2741 15.5205 54.4192 17.9364 54.4192 20.055C54.4192 22.8054 55.7201 24.1063 57.4298 24.1063Z"
                  fill="black"
                />
                <path
                  d="M52.0568 17.0815L52.0196 17.1187C52.2798 16.4125 52.7258 16.1152 53.1718 16.1152C53.8037 16.1152 54.4355 16.6727 54.4355 17.3789C54.4355 17.5647 54.3984 17.7134 54.324 17.8992C52.8745 21.4302 50.7187 25.5559 47.2621 27.9718L47.1878 28.7152C46.7789 33.1754 44.5117 36.0001 41.6497 36.0001C39.4939 36.0001 38.2302 34.5134 38.2302 32.7665C38.2302 29.6072 41.4638 28.455 44.4745 26.5223C44.5488 25.7417 44.586 24.8497 44.6231 23.8461C43.1364 25.4815 41.5382 26.1506 40.1258 26.1506C37.301 26.1506 34.9966 23.8461 34.9966 20.3152C34.9966 14.8886 38.5647 11.3205 42.5417 11.3205H42.5789C45.2922 11.3205 48.1913 12.77 48.1913 15.3718C48.1913 16.2267 47.8196 20.8727 47.5223 24.478C49.5293 22.5824 51.2019 19.4975 52.0568 17.0815ZM40.5346 23.4745C41.9099 23.4745 43.7683 22.6196 44.9205 18.4196C45.1063 17.4904 45.2178 16.6727 45.1807 15.7063C44.9577 14.7028 44.1028 14.1081 42.8762 14.1081C40.3488 14.1081 37.9329 16.524 37.9329 20.2037C37.9329 22.4338 38.9736 23.4745 40.5346 23.4745ZM41.947 33.2869H41.9842C42.7647 33.2869 43.6196 32.7665 44.1771 29.4214C42.5417 30.3877 41.0178 31.3541 41.0178 32.5063C41.0178 32.9895 41.3895 33.2869 41.947 33.2869Z"
                  fill="black"
                />
                <path
                  d="M35.649 17.0815L35.6119 17.1187C35.872 16.4125 36.3924 16.1523 36.8384 16.1523C37.4703 16.1523 38.0278 16.6355 38.0278 17.3417C38.0278 17.4904 38.0278 17.6762 37.9535 17.8992C36.6526 21.2444 33.9021 22.9541 31.226 23.2143C29.9995 25.2957 27.9924 26.8196 25.1304 26.8196C21.0419 26.8196 19.2207 23.586 19.2207 20.055C19.2207 15.7063 21.9711 10.8744 26.58 10.8744C27.5835 10.8744 28.4384 11.0975 29.1446 11.3948C31.226 12.1753 32.5641 14.8886 32.5641 17.7877C32.5641 18.7169 32.4897 19.9461 32.2667 20.5382C33.642 20.055 34.9428 18.9399 35.649 17.0815ZM27.8809 13.9222V13.8851C27.0632 13.8851 26.58 14.9629 26.58 16.2638C26.58 18.1594 27.6207 19.9063 29.2561 20.5382C29.5163 19.7205 29.6278 18.7913 29.6278 17.7134C29.6278 15.632 28.9959 13.9222 27.8809 13.9222ZM25.1676 24.1063C26.2083 24.1063 27.249 23.6603 28.0667 22.7311C25.6508 21.6532 24.1269 19.1258 24.1269 16.7098C24.1269 15.8921 24.2756 15.0373 24.4986 14.2939C23.0119 15.5205 22.157 17.9364 22.157 20.055C22.157 22.8054 23.4579 24.1063 25.1676 24.1063Z"
                  fill="black"
                />
                <path
                  d="M21.1096 15.9083C20.5892 15.9083 20.1432 16.1685 19.8458 16.8747C18.8795 19.3278 16.8723 23.4907 14.828 23.4907C13.5408 23.4907 12.5447 23.1996 11.5381 22.9054C10.5102 22.605 9.47142 22.3013 8.10053 22.3013C7.61733 22.3013 6.94829 22.3757 6.31642 22.4872C8.22 19.8914 8.93114 16.7477 9.62022 10.8054C8.32276 10.7228 7.26735 10.4831 6.49807 10.241C5.67642 17.7775 4.74336 20.6511 1.33579 23.4907C0.889758 23.8624 0.666748 24.3828 0.666748 24.9032C0.666748 25.7209 1.37296 26.4271 2.26502 26.4271C2.56237 26.4271 2.89688 26.3156 3.2314 26.1669C5.12702 25.312 6.27925 25.089 7.69167 25.089C8.58984 25.089 9.66458 25.3459 10.8152 25.6208C12.1406 25.9376 13.5667 26.2784 14.9396 26.2784C17.9502 26.2784 19.9202 23.3421 22.1131 17.6552C22.2247 17.4694 22.2618 17.2464 22.2618 17.0605C22.2618 16.3543 21.7043 15.9083 21.1096 15.9083Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.68666 8.70287C7.35975 8.93784 8.41057 9.2114 9.773 9.29233L9.99601 9.29222C14.1961 9.29222 16.9466 6.6904 16.9466 3.56821C16.9466 1.56109 15.3855 0 13.1925 0C10.2562 0 8.21191 2.00712 7.17118 5.98419C5.87027 5.27798 4.97822 4.01424 4.53219 2.41598C4.30917 1.63543 3.82598 1.15223 3.15693 1.15223C2.33922 1.15223 1.81885 1.78411 1.81885 2.63899C1.81885 5.16648 3.78881 7.58245 6.68798 8.69752L6.68666 8.70287ZM10.219 6.57889C10.7765 4.01424 11.6686 2.78767 12.858 2.78767C13.4899 2.78767 13.8987 3.15936 13.8987 3.8284C13.8987 5.05497 12.5978 6.50455 10.219 6.57889Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_9203_9427">
                  <rect width="70" height="36" fill="white" transform="translate(0.666748)" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex justify-center items-center gap-1">
            <span className="text-black text-base font-normal leading-[150%]">Home</span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <span className="text-black text-base font-normal leading-[150%]">Features</span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <span className="text-black text-base font-normal leading-[150%]">Pricing</span>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex justify-center items-center gap-1">
              <span className="text-black text-base font-normal leading-[150%]">Support</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Desktop Actions
        <div className="hidden md:flex justify-end items-center gap-4">
          <Button className="flex px-5 py-2 justify-center items-center gap-2 border border-black bg-black text-white text-base font-normal leading-[150%] hover:bg-black/90">
            Sign Up
          </Button>
        </div> */}

        {/* Mobile Menu Button */}
        <div className="flex justify-center">
          <Link href="/auth/sign-in" className=" py-2 px-3 rounded-xl text-white justify-center items-center gap-2 border border-black bg-black text-base font-normal leading-[150%] hover:bg-black/90">
            Sign In
          </Link>
        </div>
      </div>


    </nav>
  );
}
