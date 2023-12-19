import React, {FC} from 'react';
import cls from './ProfilePage.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import ChangeName from "@/app/dashboard/profile/changeName/changeName";
import ChangeEmail from "@/app/dashboard/profile/changeEmail/changeEmail";
import ChangePhone from "@/app/dashboard/profile/changePhone/changePhone";
import ChangePassword from "@/app/dashboard/profile/changePassword/changePassword";
import Authorizations from "@/app/dashboard/profile/authorizations/authorizations";
import BlockCategory from "@/app/dashboard/profile/blockCategory/blockCategory";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";

interface pageProps {
}
export interface HidePassword {
    current: boolean,
    new:boolean,
    newTwo:boolean
}

const ProfilePage:FC<pageProps> = (props) => {
    const { } = props;

    return (
        <div className={classNames(cls.ProfilePage, {},[] )} >
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <div className={cls.coverLink}>
                            <h1 className={cls.mainTitle}>Профиль пользователя</h1>
                            <div className={cls.linkCover}>
                                <AppLink
                                    classname={cls.link}
                                    href='/dashboard/search'>
                                    Перейти к заявкам
                                </AppLink>
                            </div>
                        </div>
                        <div className={cls.header}>
                            <h2 className={cls.registerText}>
                                <div className={cls.text}> Дата регистрации</div>
                                <div className={cls.dateText}>
                                    {/*{*/}
                                    {/*    !infoUser*/}
                                    {/*        ? 'загрузка данных...'*/}
                                    {/*        : infoUser && infoUser.createdAt*/}
                                    {/*            // eslint-disable-next-line max-len*/}
                                    {/*            ? `${ new Date(Date.parse(infoUser.createdAt)).getDate() < 10 ? `0${new Date(Date.parse(infoUser.createdAt)).getDate()}.` : `${new Date(Date.parse(infoUser.createdAt)).getDate()}.` }${ new Date(Date.parse(infoUser.createdAt)).getMonth() < 9 ? `0${new Date(Date.parse(infoUser.createdAt)).getMonth() + 1}.` : `${new Date(Date.parse(infoUser.createdAt)).getMonth() + 1}.` }${ new Date(Date.parse(infoUser.createdAt)).getFullYear() }г`*/}
                                    {/*            : 'данных нет'*/}
                                    {/*}*/}
                                </div>
                            </h2>
                        </div>
                        <ChangeName/>
                        <ChangeEmail/>
                        <ChangePhone/>
                        <ChangePassword/>
                        <Authorizations/>
                        <div className={cls.сategoriesCover}>
                            <h3 className={cls.subTitle}>Активные подписки</h3>
                            <BlockCategory/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default  ProfilePage;
