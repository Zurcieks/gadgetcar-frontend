"use client";

import React from "react";
import { withAdminProtection } from "../../../../hoc/withAdminAuth";
const Admin = () => {
  return <div>Dupa</div>;
};

export default withAdminProtection(Admin);
