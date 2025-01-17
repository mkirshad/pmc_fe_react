import {
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone,
    PiBagSimpleDuotone
} from 'react-icons/pi'

import { FaHome, FaChartPie, FaUserPlus } from 'react-icons/fa';
import { MdAnalytics, MdDownload, MdOutlineTrackChanges } from 'react-icons/md';

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    singleMenu: <PiAcornDuotone />,
    collapseMenu: <PiArrowsInDuotone />,
    groupSingleMenu: <PiBookOpenUserDuotone />,
    groupCollapseMenu: <PiBookBookmarkDuotone />,
    groupMenu: <PiBagSimpleDuotone />,
    FaUserPlus: <FaUserPlus />,
    MdDownload: <MdDownload />,
    MdOutlineTrackChanges:<MdOutlineTrackChanges />
}

export default navigationIcon
