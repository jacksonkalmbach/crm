import { configureStore } from "@reduxjs/toolkit";
import sectionNavigationSlice from "./reducers/navigation/sectionNavigationSlice";
import contactsNavigationSlice from "./reducers/navigation/contactsNavigationSlice";
import selectAllLeadsSlice from "./reducers/leads/selectAllLeadsSlice";
import showCreateLeadSlice from "./reducers/leads/showCreateLeadSlice";
import sortLeadsSlice from "./reducers/leads/sortLeadsSlice";

const store = configureStore({
  reducer: {
    sectionNavigation: sectionNavigationSlice,
    contactsNavigation: contactsNavigationSlice,
    selectAllLeads: selectAllLeadsSlice,
    showCreateLead: showCreateLeadSlice,
    sortLeads: sortLeadsSlice,
  },
});

export default store;
