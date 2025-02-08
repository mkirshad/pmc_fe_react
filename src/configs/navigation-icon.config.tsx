import {
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone,
    PiBagSimpleDuotone
} from 'react-icons/pi'

import { FaHome, FaChartPie, FaUserPlus, FaTools, FaClipboardList, FaDatabase, FaAddressBook, FaChartLine } from 'react-icons/fa';
import { MdAnalytics, MdDownload, MdOutlineTrackChanges, MdReportProblem, MdDashboard, MdRecycling, MdFactCheck, MdAssignmentTurnedIn } from 'react-icons/md';

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
    MdOutlineTrackChanges:<MdOutlineTrackChanges />,
    FaTools:<FaTools />,
    FaClipboardList:<FaClipboardList />,
    MdReportProblem:<MdReportProblem />,
    MdDashboard:<MdDashboard />,
    FaDatabase:<FaDatabase/>, 
    FaAddressBook:<FaAddressBook/>, 
    MdRecycling:<MdRecycling/>,
    FaChartLine:<FaChartLine/>,
    MdAnalytics:<MdAnalytics/>,
    MdFactCheck:<MdFactCheck/>, 
    MdAssignmentTurnedIn:<MdAssignmentTurnedIn/>
}

export default navigationIcon
