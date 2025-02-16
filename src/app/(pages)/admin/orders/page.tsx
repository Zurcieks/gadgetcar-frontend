"use client";

import React from "react";
import { withAdminProtection } from "../../../../../hoc/withAdminAuth";

const page = () => {
  return <div>page</div>;
};

export default withAdminProtection(page);
