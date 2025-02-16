 "use client"
import React from 'react'
import { withAdminProtection } from '../../../../../../hoc/withAdminAuth';
import AddProduct from '@/app/components/adminComponents/AddProduct';

const page = () => {
  return (
    <div>
      <AddProduct/>
    </div>
  )
}

export default withAdminProtection(page);