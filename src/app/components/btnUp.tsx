"use client";

const BtnUp = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="bg-[#F2308B] fixed bottom-4 right-4 w-10 h-10 flex justify-center items-center rounded z-50"
      role="button"
      onClick={scrollToTop}
    >
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_12_5)">
          <path
            d="M8.88281 1.61719C8.39453 1.12891 7.60156 1.12891 7.11328 1.61719L0.863281 7.86719C0.375 8.35547 0.375 9.14844 0.863281 9.63672C1.35156 10.125 2.14453 10.125 2.63281 9.63672L6.75 5.51562V17.5C6.75 18.1914 7.30859 18.75 8 18.75C8.69141 18.75 9.25 18.1914 9.25 17.5V5.51562L13.3672 9.63281C13.8555 10.1211 14.6484 10.1211 15.1367 9.63281C15.625 9.14453 15.625 8.35156 15.1367 7.86328L8.88672 1.61328L8.88281 1.61719Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_12_5">
            <rect
              width="15"
              height="20"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default BtnUp;
