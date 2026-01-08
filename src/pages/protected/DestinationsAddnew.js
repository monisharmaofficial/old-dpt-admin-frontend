import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import DestinationsAdd from "../../features/DestinationsCopy/components/AddDestinationModalBodynew";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Destinations" }));
  }, []);

  return <DestinationsAdd />;
}

export default InternalPage;
