import { shallow, ShallowWrapper } from "enzyme";
import MasterMenu from "./MasterMenu";

const defaultProps = {
    id: 'KebabMenu',
    open: false,
    anchorEl: null,
    handleMenuClose: jest.fn(),
    handleMenuItemClick: jest.fn()
}

describe('Master Menu Test Suit', () => {
    let component: ShallowWrapper;

    beforeEach(() => {
        component = shallow(<MasterMenu {...defaultProps}/>);
    });

    it('should be defined', () => {
        expect(component).toBeDefined();
    });

    it("render Master Menu component", () => {
        expect(component).toBeTruthy();
    });

    it('Should trigger Menu item click', () => {
        component.find(`#ActivityId`).simulate('click');
        expect(defaultProps.handleMenuItemClick).toHaveBeenCalled();
    });
});