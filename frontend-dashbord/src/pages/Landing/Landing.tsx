import React from "react";
import { Box } from "@material-ui/core";

import {
  MainSection,
  PartnerSection,
  DanaSwapSection,
  StableCoinSection,
  TopNotchSection,
  ProfileSection,
  FooterSection,
} from "./sections";

const Landing: React.FC = () => {
  return (
    <Box>
      <MainSection />
      <DanaSwapSection />
      <StableCoinSection />
      <TopNotchSection />
      <ProfileSection />
      <PartnerSection />
      <FooterSection />
    </Box>
  );
};

export default Landing;
