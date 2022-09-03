// import icons
import { BsCloudHaze2Fill } from "react-icons/bs";
import {
    IoMdRainy,
    IoMdCloudy,
    IoMdThunderstorm,
} from "react-icons/io";

export const returnIcon = (temp: number) => {
    switch (true) {
        case (temp < 20):
            return <IoMdRainy />
        case (temp > 20 && temp < 30):
            return <BsCloudHaze2Fill />
        case (temp > 30):
            return <IoMdCloudy />
        default:
            return <IoMdThunderstorm />

    }

};