import classNames from '@/utils/classNames'
import ScrollBar from '@/components/ui/ScrollBar'
import Logo from '@/components/template/Logo'
import VerticalMenuContent from '@/components/template/VerticalMenuContent'
import { useThemeStore } from '@/store/themeStore'
import { useSessionUser } from '@/store/authStore'
import { useRouteKeyStore } from '@/store/routeKeyStore'
import navigationConfig from '@/configs/navigation.config'
import appConfig from '@/configs/app.config'
import { Link } from 'react-router-dom'
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    SIDE_NAV_CONTENT_GUTTER,
    HEADER_HEIGHT,
    LOGO_X_GUTTER,
} from '@/constants/theme.constant'
import type { Mode } from '@/@types/theme'
import { useEffect, useState } from 'react'

type SideNavProps = {
    translationSetup?: boolean
    background?: boolean
    className?: string
    contentClass?: string
    mode?: Mode
}

const SideNav = ({
    translationSetup = true,
    background = true,
    className,
    contentClass,
    mode,
}: SideNavProps) => {
    const defaultMode = useThemeStore((state) => state.mode)
    const direction = useThemeStore((state) => state.direction)
    
    // Remove state from theme store and use local state for hover effect
    const [isHovered, setIsHovered] = useState(false)
    const [isDelayedHovered, setDelayedIsHovered] = useState(false)
    

    const currentRouteKey = useRouteKeyStore((state) => state.currentRouteKey)
    const userAuthority = useSessionUser((state) => state.user.authority)
    const fetchUserGroups = useSessionUser((state) => state.fetchUserGroups)

    useEffect(() => {
        console.log('userAuthority', userAuthority)
        fetchUserGroups() // Fetch user groups if needed
    }, [])


    

    return (
        <div
            style={{
                width: isHovered ? SIDE_NAV_WIDTH : SIDE_NAV_COLLAPSED_WIDTH,
                minWidth: isHovered ? SIDE_NAV_WIDTH : SIDE_NAV_COLLAPSED_WIDTH,
                transition: 'width 0.3s ease-in-out',
            }}
            className={classNames(
                'side-nav',
                background && 'side-nav-bg',
                isHovered && 'side-nav-expand',
                className,
            )}
            onMouseEnter={() => {
                setIsHovered(true);
                setTimeout(() => setDelayedIsHovered(true), 1);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                setTimeout(() => setDelayedIsHovered(false), 1);
            }}
        >
            {/* Logo */}
            <Link
                to={appConfig.authenticatedEntryPath}
                className="side-nav-header flex flex-col justify-center"
                style={{ height: HEADER_HEIGHT }}
            >
                <Logo
                    imgClass="max-h-10"
                    mode={mode || defaultMode}
                    type={isHovered ? 'full' : 'streamline'}
                    className={classNames(
                        isHovered ? LOGO_X_GUTTER : SIDE_NAV_CONTENT_GUTTER
                    )}
                />
            </Link>

            {/* Navigation Content */}
            <div className={classNames('side-nav-content', contentClass)}>
                <ScrollBar style={{ height: '100%' }} direction={direction}>
                    {(isHovered === isDelayedHovered) && 
                    <VerticalMenuContent
                        collapsed={!isHovered}
                        navigationTree={navigationConfig}
                        routeKey={currentRouteKey}
                        direction={direction}
                        translationSetup={translationSetup}
                        userAuthority={userAuthority || []}
                    />
                    }
                </ScrollBar>
            </div>
        </div>
    )
}

export default SideNav
