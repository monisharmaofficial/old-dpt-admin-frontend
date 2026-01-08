import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Destinations from "../../features/DestinationsCopy";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Destinations" }));
  }, []);

  return <Destinations />;
}

export default InternalPage;
