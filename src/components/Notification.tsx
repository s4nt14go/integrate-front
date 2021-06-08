import React, {forwardRef, useImperativeHandle, useState} from "react";
import {animated, useSpring} from "@react-spring/web";

export enum Severity {
  SUCCESS = 1,
  INFO,
  WARNING,
  ERROR,
}

const Notification = function Notification(_:any, ref:any) {

  const [data, setData] = useState<any>({});
  useImperativeHandle(ref, () => ({
    start: (msg:string, severity:string) => {
      setData({
        msg,
        severity,
      })
      api.start({ to: [
          { opacity: 1 },
          { opacity: 0, delay: 2000 },
        ] })
    }
  }));

  const [styles, api] = useSpring( {
    from: {opacity: 0 }
  }, []);

  let containerColor, iconColor, path;
  switch (data.severity) {
    case Severity.SUCCESS:
      containerColor = 'bg-green-500 border-green-700';
      iconColor = 'text-green-500';
      path = <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>;
      break;
    case Severity.INFO:
      containerColor = 'bg-blue-400 border-blue-700';
      iconColor = 'text-blue-500';
      path = <><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
        <circle cx="8" cy="4.5" r="1"/></>;
      break;
    case Severity.WARNING:
      containerColor = 'bg-orange-400 border-orange-700';
      iconColor = 'text-orange-500';
      path = <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>;
      break;
    case Severity.ERROR:
      containerColor = 'bg-red-500 border-red-700';
      iconColor = 'text-red-500';
      path = <><path d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
        <path d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/></>;
      break;
    default:
      return null;
  }

  return <animated.div style={styles} className="bottom-9 fixed right-5">

    <div className={`flex items-center border-l-4 py-2 px-3 shadow-md mb-2 ${containerColor}`}>
      <div className={`rounded-full bg-white mr-3 ${iconColor}`}>
        <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          {path}
        </svg>
      </div>
      <div className="text-white max-w-xs ">
        {data.msg}
      </div>
    </div>

  </animated.div>
}

export default forwardRef(Notification);
