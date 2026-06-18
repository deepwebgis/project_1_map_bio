const SubButton = (props) => {
  return (
    <>
      <label className="flex cursor-pointer items-center gap-3 rounded-md text-lg ">
        <input type="radio" name="item" className="h-4 w-4 accent-gray-500" />
        <span className="text-gray-300">{props.item}</span>
      </label>
    </>
  );
};

export default SubButton;
