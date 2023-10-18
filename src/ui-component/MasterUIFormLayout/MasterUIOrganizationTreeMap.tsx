import { useState, FC } from 'react';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import Apartment from '@mui/icons-material/Apartment';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { FieldProps } from '../Form/FormTypes';

const INDENTATION_FOR_PARENT_ORG: number = 12;
const INDENTATION_MULTIPLY_FACTOR = 2;

const INDENTATION_FOR_CHILD_ORG =
    INDENTATION_FOR_PARENT_ORG * INDENTATION_MULTIPLY_FACTOR;

type ChildOrganization = {
    id: number;
    name: string;
};
type ParentOrganization = {
    id: number;
    name: string;
    description?: string;
    children: Array<ChildOrganization>;
};

const getDefaultValues = (fieldProps: FieldProps): Array<ParentOrganization> => {
    return [
        {
            id: 1,
            name: fieldProps.label?.text,
            description: fieldProps?.info,
            children: [],
        },
    ];
};
type MasterUIOrganizationTreeProps = {
    fieldProps: FieldProps;
}
export const MasterUIOrganizationTree: FC<MasterUIOrganizationTreeProps> = ({ fieldProps }: MasterUIOrganizationTreeProps) => {
    const [organizations, setOrganizations] = useState<ParentOrganization[]>(getDefaultValues(fieldProps));

    const addParentOrganization = () => {
        const id = organizations.length + 1;
        const newOrg: ParentOrganization = {
            id,
            name: `Some org ${id}`,
            children: [],
        };
        const newOrganizationsArray: ParentOrganization[] = [
            ...organizations,
            newOrg,
        ];
        setOrganizations(newOrganizationsArray);
    };
    const addChildOrganization = (parentOrg: ParentOrganization) => {
        const id = parentOrg.children.length + 1;
        const newChildOrg: ChildOrganization = {
            id,
            name: `Some Child Org ${id}`,
        };
        parentOrg.children.push(newChildOrg);
        const newOrganizationsArray: ParentOrganization[] = [...organizations];
        setOrganizations(newOrganizationsArray);
    };

    return (
        <List>
            <OrgItemBase
                key="AddParentOrg"
                text="Add Parent Organization"
                onClick={addParentOrganization}
                icon={<AddIcon />}
            />
            {organizations.map((parentOrg) => {
                return (
                    <ParentOrg
                        parentOrg={parentOrg}
                        addChildOrganization={addChildOrganization}
                    />
                );
            })}
        </List>
    );
}
type ParentOrgProps = {
    parentOrg: ParentOrganization;
    addChildOrganization: Function;
};
const ParentOrg: FC<ParentOrgProps> = ({
    parentOrg,
    addChildOrganization,
}) => {
    return (
        <>
            <OrgItemBase
                key={parentOrg.id}
                icon={<Apartment />}
                text={parentOrg.name}
                subText={parentOrg.description}
                listSx={{ pl: INDENTATION_FOR_PARENT_ORG, cursor: 'default' }}
                buttonSx={{ cursor: 'default' }}
            />
            {parentOrg.children.map(childOrg =>
                <OrgItemBase
                    key={`${parentOrg.id}'s child ${childOrg.id}`}
                    text={childOrg.name}
                    listSx={{
                        pl: INDENTATION_FOR_CHILD_ORG,
                    }}
                    icon={<CorporateFareIcon />}
                />
            )}
            <OrgItemBase
                key={`AddChildOrgButtonFor${parentOrg.id}`}
                text="Add Child Organization"
                listSx={{
                    pl: INDENTATION_FOR_CHILD_ORG,
                }}
                onClick={() => addChildOrganization(parentOrg)}
                icon={<AddIcon />}
            />
        </>
    );
};
interface OrgItemBaseProps {
    text: string;
    onClick?: Function;
    listSx?: Record<string, any>;
    buttonSx?: Record<string, any>;
    icon: any;
    subText?: string;
}

const OrgItemBase: FC<OrgItemBaseProps> = ({
    text,
    onClick,
    listSx,
    buttonSx,
    icon,
    subText,
}) => {
    return (
        <ListItem sx={listSx}>
            <ListItemAvatar>
                <Button
                    disableRipple={!onClick}
                    disableFocusRipple={!onClick}
                    sx={buttonSx}
                    onClick={() => {
                        if (!onClick) {
                            return;
                        }
                        onClick();
                    }}
                >
                    {icon}
                </Button>
            </ListItemAvatar>
            <ListItemText sx={{ ml: '12px' }} primary={text} secondary={subText} />
        </ListItem>
    );
};
