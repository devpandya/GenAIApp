import React from 'react';
import { shallow, ShallowWrapper } from "enzyme";
import RightDrawer from "./RightDrawer";

const defaultProps = {
   // children: null,
    open: true,
   // direction: '',
    closeHandler: jest.fn(),
};

describe("Right Drawer Component", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
      wrapper = shallow(<RightDrawer {...defaultProps} />);
    });

    it("render right drawer component", () => {
       expect(wrapper).toBeTruthy();
    });

    it("render right drawer component with right chevron icon", () => {
        wrapper = shallow(<RightDrawer {...defaultProps} direction="right" />);
        expect(wrapper.find(`#right-icon`).exists()).toBe(true);
     });

     it("right drawer component with left chevron icon", () => {
        wrapper = shallow(<RightDrawer {...defaultProps} direction="left" />);
        expect(wrapper.find(`#left-icon`).exists()).toBe(true);
     });

     it("render right drawer component with right chevron icon click event", () => {
        wrapper = shallow(<RightDrawer {...defaultProps} direction="right" />);
        wrapper.find(`#right-icon`).simulate('click');
        expect(defaultProps.closeHandler).toHaveBeenCalled();
     });

     it("render right drawer component with left chevron iconv click event", () => {
        wrapper = shallow(<RightDrawer {...defaultProps} direction="left" />);
        wrapper.find(`#left-icon`).simulate('click');
        expect(defaultProps.closeHandler).toHaveBeenCalled();
     });
});