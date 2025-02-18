
import Link from "next/link"
import { Product } from "../../../../types/product.types"
import { ChevronRightIcon } from "lucide-react"
interface ProductBreadCrumbProps {
    product: Product
}
export function ProductBreadcrumb({product}: ProductBreadCrumbProps) {
    return (
        <nav className="flex mt-5" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
                <li>
                    <Link href="/produkty" className="text-sm   font-medium">
                        Produkty
                    </Link>
                </li>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                <li>
                    <span className="text-sm font-medium">{product.name}</span>
                </li>
            </ol>
        </nav>
    )
}