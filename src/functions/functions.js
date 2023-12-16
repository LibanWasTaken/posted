// Imports
import { db } from "../services/firebase-config";
import { addDoc, collection } from "firebase/firestore";
// import { useUserContext } from "../context/UserContext";
import dayjs from "dayjs";

// Constants
// const { user: currentUser, loading: loadingUser } = useUserContext();

// Functions
export function scrollToBottom(defined, duration = 1000) {
  const element = document.documentElement;
  const start = element.scrollTop;
  let end;
  if (!defined) {
    end = element.scrollHeight - element.clientHeight;
  } else {
    end = defined;
  }
  const startTime = performance.now();

  function animateScroll(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    element.scrollTop = start + (end - start) * easedProgress;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export async function sendNotification(uid, message, url) {
  if (uid && message) {
    const newNotification = {
      msg: message,
      ts: Number(dayjs().valueOf()),
      link: url ? url : "#",
    };
    try {
      const docRef = await addDoc(
        collection(db, "users", uid, "notifs"),
        newNotification
      );

      console.log("Notification Sent");
    } catch (e) {
      console.error("Error sending notification", e);
    }
  }
}

export function getTimeDifferenceShort(timestamp) {
  const currentTime = dayjs();
  const targetTime = dayjs(timestamp);

  const secondsDiff = Math.abs(currentTime.diff(targetTime, "second"));
  const minutesDiff = Math.abs(currentTime.diff(targetTime, "minute"));
  const hoursDiff = Math.abs(currentTime.diff(targetTime, "hour"));
  const daysDiff = Math.abs(currentTime.diff(targetTime, "day"));
  const monthsDiff = Math.abs(currentTime.diff(targetTime, "month"));
  const yearsDiff = Math.abs(currentTime.diff(targetTime, "year"));

  if (secondsDiff < 60) {
    return `${secondsDiff}s`;
  } else if (minutesDiff < 60) {
    return `${minutesDiff}m`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  } else if (daysDiff < 30) {
    return `${daysDiff}d`;
  } else if (monthsDiff < 12) {
    return `${monthsDiff}M`;
  } else if (secondsDiff < 0) {
    return `${monthsDiff}f`;
  } else {
    return `${yearsDiff}y`;
  }
}
