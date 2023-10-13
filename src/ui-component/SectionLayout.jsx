import React from 'react'
import { styled, Grid, Typography } from '@mui/material';

const SectionHeader = styled(Grid)(() => ({
  display: "flex",
  height: "63px",
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "20px",
  padding:"0px 24px",
  alignSelf: "stretch",
  borderBottom: "1px solid #E5E5E5",

}));

const Section   = styled(Grid)(() => ({
    borderRadius: "6px",
    background: "#FFFFFF",
    display: "flex",
    paddingBottom: "0px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0px",
    marginBottom: "24px",
}));

const SectionContent = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "5px",
    padding:"0px 24px",
    alignSelf: "stretch",
    width:"100%"
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    fontWeight: 600,
    color: theme.palette.text.primary,
    lineHeight: "20px",
    fontStyle: "normal",
}));

/**
 * Section Layout for Master UI
 * @param key
 * @param title
 * @param initialFields
 * @param info
 * @param registerClick
 * @param loading
 * @param className
 * @returns
 */
import PropTypes from 'prop-types';

const SectionLayout = ({ id, title, children, className }) => {
    return (
        <Section id={id} sx={{ width: "100%" }}>
            <SectionHeader>
                <Grid>
                    <Title>{title}</Title>
                </Grid>
            </SectionHeader>
            <SectionContent className={className}>
                {children}
            </SectionContent>
        </Section>
    );
};

SectionLayout.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    info: PropTypes.bool,
    className: PropTypes.string,
};

SectionLayout.defaultProps = {
    info: false,
    className: '',
};

export default SectionLayout;