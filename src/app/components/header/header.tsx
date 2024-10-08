'use client';
import React from 'react';
import cls from './header.module.scss';
import {
    classNames,
    Mods,
} from '@/app/components/shared/lib/classNames/className';
import NavBar from '@/app/components/widgets/navBar/navBar';
import Logotype from '@/app/components/header/logotype/logotype';
import { AppLink } from '@/app/components/shared/ui/appLink/appLink';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks/redux';
import LoginModal from '@/app/components/features/AuthBy/loginModal/loginModal';
import { useGetMeMutation } from '@/app/redux/entities/requestApi/requestApi';
import { authSliceActions } from '@/app/redux/entities/auth/slice/authSlice';
import { BurgerButton } from '@/app/components/widgets/BurgerButton/burgerButton';
import Notification from '@/app/components/shared/notification/notification';
import { getThisCookie } from '@/app/components/shared/lib/cookie/cookie';
import BtnEnterBlock from '@/app/components/header/btnEnterBlock/btnEnterBlock';
import { Button } from '@/app/components/shared/ui/Button/Button';
import { statePopupSliceActions } from '@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice';
import { selectAuthState } from '@/app/redux/entities/auth/selectors';

interface HeaderProps {
    classname?: string;
}

// что передаем в NavBar
export type NavBar = {
    text: string;
    href: string;
};

export const navbarFirst: NavBar[] = [
    { text: 'Тарифы', href: '/dashboard/price' },
    { text: 'Вопросы', href: '/dashboard/faq' },
    { text: 'Отзывы', href: '/dashboard/feedback' },
    // {text: 'контакты', href:'/dashboard/feedback'},
];

const Header = React.memo(({ classname }: HeaderProps) => {
    const dispatch = useAppDispatch();
    const cookies = getThisCookie();

    //RTK
    // // запрос данных на получение информации пользователя пользователя
    const [
        getInfoUser,
        {
            data: requestGetMe,
            error: errorUser,
            isLoading: isLoadingReqGetUser,
            isError,
        },
    ] = useGetMeMutation();
    // //получаем имеющиеся категории в базе данных, доступные к подписке

    // STATES FROM REDUX
    // данные по авторизации
    // Actions
    // для сохранения данных о пользователе
    const { addAdminRole, addMainAdminRole, addAuthStatus, addInfoUser } =
        authSliceActions;
    // добавить категории в стейт

    const stateAuth = useAppSelector(selectAuthState);
    // ACTIONS FROM REDUX
    const { changeStateLoginFormPopup } = statePopupSliceActions;
    //STATE
    // для отображения и скрытия подменю профиля
    const [showHeader, setShowHeader] = React.useState(true);
    let lastScrollY = React.useRef(0);
    //REF
    // const burgerMenuOpenRef = React.useRef(stateMenuBurgerHeader);

    // Mods для стилей
    const mods: Mods = {
        [cls.hideHeader]: !showHeader,
    };

    //FUNCTIONS

    //USEEFFECT

    React.useEffect(() => {
        if (cookies && cookies._z) {
            getInfoUser(cookies).then((result) => {
                if (result && 'data' in result && result.data) {
                    dispatch(addInfoUser(result.data));
                    dispatch(addMainAdminRole(result.data.isMainAdmin));
                    dispatch(addAdminRole(result.data.isAdmin));
                    dispatch(addAuthStatus(true));
                }
            });
        }
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowHeader(
                currentScrollY < lastScrollY.current || currentScrollY === 0,
            );
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const openLoginFormPopup = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);

    return (
        <div className={classNames(cls.header, mods, [classname])}>
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <div className={cls.leftSection}>
                            <div className={cls.coverLogo}>
                                <Logotype />
                            </div>
                            <NavBar
                                classnameForLink={cls.navBarFirst}
                                arrayText={navbarFirst}
                            />
                        </div>
                        <div className={cls.rightSection}>
                            <div className={cls.coverButton}>
                                {stateAuth ? (
                                    <AppLink
                                        classname={cls.link}
                                        href='/dashboard/search'
                                    >
                                        <span className={cls.spanFirst}>
                                            Перейти к заявкам
                                        </span>
                                        <span className={cls.spanSecond}>
                                            Заявки
                                        </span>
                                    </AppLink>
                                ) : (
                                    <Button
                                        classname={cls.link}
                                        onClick={openLoginFormPopup}
                                    >
                                        <span className={cls.spanFirst}>
                                            Перейти к заявкам
                                        </span>
                                        <span className={cls.spanSecond}>
                                            Заявки
                                        </span>
                                    </Button>
                                )}
                                <BtnEnterBlock />
                            </div>
                            <BurgerButton />
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
            <LoginModal />
        </div>
    );
});

export default Header;
