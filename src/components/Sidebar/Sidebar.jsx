import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiSidebar, 
    FiShoppingBag,
    FiTrendingUp,
    FiThumbsUp,
    FiBarChart,
    FiUser,
    FiLogOut
} from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { GiJoystick, GiChessQueen, GiPokerHand } from 'react-icons/gi'; // Game Icons


import './Sidebar.scss';
import { logout } from '../../store/AccessTokenStore';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <FiSidebar />,
        to: '/',
        section: '',
        sectionNumber: 0
    },
    {
        display: 'Income',
        icon: <FiTrendingUp />,
        to: '/incomes',
        section: 'incomes',
        sectionNumber: 0
    },
    {
        display: 'Expense',
        icon: <FiShoppingBag />,
        to: '/expenses',
        section: 'expenses',
        sectionNumber: 0
    },
    {
        display: 'Goals',
        icon: <FiThumbsUp />,
        to: '/goals',
        section: 'goals',
        sectionNumber: 0
    },
    {
        display: 'ChatBot',
        icon: <RiRobot2Line />,
        to: '/commons',
        section: 'commons',
        sectionNumber: 0
    },
    {
        display: 'Scholarship',
        icon: <RiRobot2Line />,
        to: '/scholarship', // Updated to match the route in App.js
        section: 'commons',
        sectionNumber: 0
      },
    {
        display: 'Budget Guessing Game',
        title: 'Finance Explorer Games',
        icon: <GiChessQueen />,
        url: 'https://669819979756522682df09bf--velvety-chaja-eb0382.netlify.app/',
        sectionNumber: 1
    },
    {
        display: 'Credit Decision Game',
        icon: <GiPokerHand />,
        url: 'https://66982002f1f07d2d3371e4b1--snazzy-chebakia-793ee3.netlify.app/',
        section: 'profile',
        sectionNumber: 1
    },
    {
        display: 'Loan Interview Game',
        icon: <GiJoystick />,
        url: 'https://6698238627625f2f08080a2c--delightful-dusk-80b1e0.netlify.app/',
        section: 'profile',
        sectionNumber: 1
    }, 
    {
        display: 'Profile',
        title: 'MY ACOUNT',
        icon: <FiUser />,
        to: '/profile',
        section: 'profile',
        sectionNumber: 2
    },
];

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    const offsiteIndicator = 23;
    const sidebarIndicatorHeight = activeIndex * stepHeight + (sidebarNavItems[activeIndex].sectionNumber * offsiteIndicator);

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current?.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <div className='sidebar__fullLogo'>
                    <FiBarChart style={{ marginRight: '1rem' }} />
                    <Link to={'/'}>MoneyFy</Link>
                </div>
            </div>

            <h3 className='sidebar__title'>MAIN</h3>

            <div ref={sidebarRef} className="sidebar__menu">
                <div
                    ref={indicatorRef}
                    className="sidebar__menu__indicator"
                    style={{
                        transform: 
                        `translateX(-50%) 
                        translateY(${sidebarIndicatorHeight}px)`
                    }}
                />

                {sidebarNavItems.map((item, index) => {
                    if (item.url) {
                        return (
                            <a href={item.url} target="_blank" rel="noopener noreferrer" key={index}>
                                {item.title ? (<h3 className='sidebar__title'>{item.title}</h3>) : ''}
                                <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                                    <div className="sidebar__menu__item__icon">
                                        {item.icon}
                                    </div>
                                    <div className="sidebar__menu__item__text">
                                        {item.display}
                                    </div>
                                </div>
                            </a>
                        );
                    } else {
                        return (
                            <Link to={item.to} key={index}>
                                {item.title ? (<h3 className='sidebar__title'>{item.title}</h3>) : ''}
                                <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                                    <div className="sidebar__menu__item__icon">
                                        {item.icon}
                                    </div>
                                    <div className="sidebar__menu__item__text">
                                        {item.display}
                                    </div>
                                </div>
                            </Link>
                        );
                    }
                })}

            </div>
            <div className='logout'>
                <button className='button-out' onClick={() => logout()}> <FiLogOut className='icon-out' />Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
