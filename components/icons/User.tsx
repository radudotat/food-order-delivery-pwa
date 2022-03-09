const User = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 600 600"
      width="24"
      height="24"
      stroke="#ffffff"
      strokeWidth="40"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <circle cx="300" cy="300" r="265" />
      <circle cx="300" cy="230" r="115" />
      <path
        d="M106.81863443903,481.4 a205,205 1 0,1 386.36273112194,0"
        strokeLinecap="butt"
      />
    </svg>
  );
};

export default User;
