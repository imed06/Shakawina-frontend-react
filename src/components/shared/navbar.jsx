
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Select, SelectItem, Spacer, Button, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import Logo from "../../assets/anemlogo.png"
import { useAuthContext } from "../../context/authContext";
import profile from "../../assets/profile.png"

export default function CustomNavbar() {
    const { user, dispatch } = useAuthContext()

    const LangIcon = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
        </svg>
    }

    // logout user
    const handleLogout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <Navbar
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary",
                ],
            }}
        >
            <NavbarBrand>
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="logo"
                        width={70}
                        quality={100}
                    />
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem >
                    <Link color="foreground" href="/" aria-current="page">
                        <div className="font-bold">Acceuil</div>
                    </Link>
                </NavbarItem>
                <Spacer x={4} />
                <NavbarItem>
                    <Link color="foreground" href="/user/profile">
                        <div  className="font-bold">Mon profil</div>
                    </Link>
                </NavbarItem>
                <Spacer x={4} />
                <NavbarItem>
                    <Link color="foreground" href="/user/reclamations">
                        <div className="font-bold">Mes réclamations</div>
                    </Link>
                </NavbarItem>
                <Spacer x={4} />
                <NavbarItem>
                    <Link color="foreground" href="/form">
                        <div className="font-bold">Réclamer</div>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <Spacer x={4} />
            <NavbarContent justify="end">

                {user ?
                    <div>
                        {/* <span>{user.plaignant.email}</span> */}
                        {/* <Button color="danger" className="text-danger font-bold" variant="bordered" onClick={handleLogout}>
                            Déconnecter
                        </Button> */}
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="warning"
                                    name="Jason Hughes"
                                    size="sm"
                                    src={profile}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile">
                                    <p className="font-semibold">{user.plaignant.email}</p>
                                </DropdownItem>
                                <DropdownItem key="déconnecter" className="text-danger" onClick={handleLogout}>
                                    Déconnecter
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    :
                    <Link href="/auth/login">
                        <Button color="primary" variant="ghost" className="text-primary font-bold" >
                            Se connecter
                        </Button>
                    </Link>
                }
            </NavbarContent>
        </Navbar>
    )
}
