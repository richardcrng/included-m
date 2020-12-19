import React from "react";
import Activity from "./models/Activity";
import db from "./models/db";

function Test() {
  const [state, setState] = React.useState<Activity>();

  React.useEffect(() => {
    const fetchActivity = async () => {
      const activity = await Activity.findById("FKBJJDcuVMyyLKCyhxao");
      console.log("found activity", activity, activity && activity.toObject());
      setState(activity);
      const activityTwoSnapshot = await db
        .collection("activities")
        .doc("FKBJJDcuVMyyLKCyhxao")
        .get();
      const activityTwoData = activityTwoSnapshot.data();
      console.log("activity two data", activityTwoData);
    };

    fetchActivity();
  }, []);

  if (!state) {
    return <div>Looking for data...</div>;
  } else {
    return (
      <div>
        <p>Message</p>
        <p>{JSON.stringify(state.toObject(), null, 2)}</p>
        <pre>{JSON.stringify(state.toObject(), null, 2)}</pre>
      </div>
    );
  }
}

export default Test;
