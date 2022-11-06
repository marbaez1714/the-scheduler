import { Outlet, Route, Routes } from 'react-router-dom';

import { Login } from 'src/pages/Login';
import { ProtectedRoute } from './ProtectedRoute';

import { Dashboard } from 'src/pages/Dashboard';
import {
  // Base
  ManageData,
  DataList,
  // Area
  AreaList,
  AreaAddForm,
  AreaModifyForm,
  // Builder
  BuilderList,
  BuilderAddForm,
  BuilderModifyForm,
  // Community
  CommunityList,
  CommunityAddForm,
  CommunityModifyForm,
  // Company
  CompanyList,
  CompanyAddForm,
  CompanyModifyForm,
  // Contractor
  ContractorList,
  ContractorAddForm,
  ContractorModifyForm,
  // Reporter
  ReporterList,
  ReporterAddForm,
  ReporterModifyForm,
  // Scope
  ScopeList,
  ScopeAddForm,
  ScopeModifyForm,
  // Supplier
  SupplierList,
  SupplierAddForm,
  SupplierModifyForm,
} from 'src/pages/ManageData';
import { CreateJob } from 'src/pages/CreateJob';
import { ModifyJobLegacy } from 'src/pages/ModifyJobLegacy';
import { NotFound } from './NotFound';

const Navigation = () => {
  return (
    <Routes>
      {/* ***** PUBLIC ROUTES ***** */}
      <Route index element={<Login />} />
      {/* ***** SECURE ROUTES ***** */}

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute component={Dashboard} />}
      />
      {/* Manage */}
      <Route path="/manage" element={<ProtectedRoute component={ManageData} />}>
        {/* List */}
        <Route index element={<ProtectedRoute component={DataList} />} />
        {/* Area */}
        <Route path="area" element={<ProtectedRoute component={Outlet} />}>
          <Route index element={<ProtectedRoute component={AreaList} />} />
          <Route
            path="add"
            element={<ProtectedRoute component={AreaAddForm} />}
          />
          <Route
            path=":areaId"
            element={<ProtectedRoute component={AreaModifyForm} />}
          />
        </Route>
        {/* Builder */}
        <Route path="builder" element={<ProtectedRoute component={Outlet} />}>
          <Route index element={<ProtectedRoute component={BuilderList} />} />
          <Route
            path="add"
            element={<ProtectedRoute component={BuilderAddForm} />}
          />
          <Route
            path=":builderId"
            element={<ProtectedRoute component={BuilderModifyForm} />}
          />
        </Route>
        {/* Company */}
        <Route path="company" element={<ProtectedRoute component={Outlet} />}>
          <Route index element={<ProtectedRoute component={CompanyList} />} />
          <Route
            path="add"
            element={<ProtectedRoute component={CompanyAddForm} />}
          />
          <Route
            path=":companyId"
            element={<ProtectedRoute component={CompanyModifyForm} />}
          />
        </Route>
        {/* Community */}
        <Route path="community" element={<ProtectedRoute component={Outlet} />}>
          <Route index element={<ProtectedRoute component={CommunityList} />} />
          <Route
            path="add"
            element={<ProtectedRoute component={CommunityAddForm} />}
          />
          <Route
            path=":communityId"
            element={<ProtectedRoute component={CommunityModifyForm} />}
          />
        </Route>
        {/* Contractor */}
        <Route
          path="contractor"
          element={<ProtectedRoute component={Outlet} />}
        >
          <Route
            index
            element={<ProtectedRoute component={ContractorList} />}
          />
          <Route
            path="add"
            element={<ProtectedRoute component={ContractorAddForm} />}
          />
          <Route
            path=":contractorId"
            element={<ProtectedRoute component={ContractorModifyForm} />}
          />
        </Route>
        {/* Reporter */}
        <Route path="reporter" element={<ProtectedRoute component={Outlet} />}>
          <Route index element={<ProtectedRoute component={ReporterList} />} />
          <Route
            path="add"
            element={<ProtectedRoute component={ReporterAddForm} />}
          />
          <Route
            path=":reporterId"
            element={<ProtectedRoute component={ReporterModifyForm} />}
          />
        </Route>
        {/* Scope */}
        <Route path="scope" element={<ProtectedRoute component={Outlet} />}>
          <Route index element={<ProtectedRoute component={ScopeList} />} />
          <Route
            path="add"
            element={<ProtectedRoute component={ScopeAddForm} />}
          />
          <Route
            path=":scopeId"
            element={<ProtectedRoute component={ScopeModifyForm} />}
          />
        </Route>
        {/* Supplier */}
        <Route path="supplier" element={<ProtectedRoute component={Outlet} />}>
          <Route index element={<ProtectedRoute component={SupplierList} />} />
          <Route
            path="add"
            element={<ProtectedRoute component={SupplierAddForm} />}
          />
          <Route
            path=":supplierId"
            element={<ProtectedRoute component={SupplierModifyForm} />}
          />
        </Route>
      </Route>
      {/* Create Job */}
      <Route
        path="/create_job"
        element={<ProtectedRoute component={CreateJob} />}
      />
      {/* Edit Job */}
      <Route
        path="/modify_jobLegacy/:jobLegacyId"
        element={<ProtectedRoute component={ModifyJobLegacy} />}
      />
      {/* 404 Page */}
      <Route path="*" element={<ProtectedRoute component={NotFound} />} />
    </Routes>
  );
};

export default Navigation;
