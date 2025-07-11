// components/Breadcrumbs.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



export default function BreadCrumb() {
    
    const router = usePathname();
    const pathSegments = router.split("/").filter(Boolean);


    return (
        <nav className="text-sm breadcrumbs p-2 bg-gray-100 rounded-md">
            <ul className="flex space-x-2">
                {/* <li>
                    <Link href="/dashboard">
                        <span className="text-blue-600 hover:underline">Root</span>
                    </Link>
                </li> */}
                {pathSegments.map((segment, index) => {
                    const path = '/' + pathSegments.slice(0, index + 1).join('/');
                    return (
                        <li key={index} className="flex items-center space-x-2">
                            <span className="text-gray-400">/</span>
                            <Link href={path}>
                                <span className="text-blue-600 hover:underline capitalize">
                                    {decodeURIComponent(segment)}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
