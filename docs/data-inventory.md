# Federal Carbon Footprint Data Inventory

This document is a work-in-progress data inventory for understanding the federal government's carbon footprint.

## Emission types

- Scope 1 - direct emission; eg burning fuel
- Scope 2 - indirect emissions, financially responsibility; eg electricity
- Scope 3 - more indirect; eg business travel, contractor waste water treatment

## Data Sources

Documented here are data sources that have been identified as potentially useful for understanding the GHG impact of federal activity.
### Federal Energy Management Program

- [FEMP EISA 432 Compliance Tracking System](https://ctsedwweb.ee.doe.gov/CTSDataAnalysis/DataAnalysisTool/DataAnalysisTool.aspx)

- [Federal Facility Reporting Requirements and Performance Data](https://www.energy.gov/eere/femp/federal-facility-reporting-requirements-and-performance-data)
    - [Federal Comprehensive Annual Energy Performance Data](https://www.energy.gov/eere/femp/federal-comprehensive-annual-energy-performance-data)
      - [Annual Report](https://ctsedwweb.ee.doe.gov/Annual/Report/Report.aspx)
      - [Comprehensive Greenhouse Gas GHG Inventories by Agency and Fiscal Year](https://ctsedwweb.ee.doe.gov/Annual/Report/ComprehensiveGreenhouseGasGHGInventoriesByAgencyAndFiscalYear.aspx)
        - [Tableau view](https://ctsedwweb.ee.doe.gov/Annual/Report/TableauView.aspx?id=3)
      - [Total Scope 1 and 2 GHG Emissions Subject To Reduction Targets Compared To FY 2008](https://ctsedwweb.ee.doe.gov/Annual/Report/TotalScope1And2GHGEmissionsSubjectToReductionTargetsComparedToFY2008.aspx)
      - [Scope 1 and 2 GHG Emissions Subject To Reduction Targets By Category Compared To FY 2008](https://ctsedwweb.ee.doe.gov/Annual/Report/Scope1And2GHGEmissionsSubjectToReductionTargetsByCategoryComparedToFY2008.aspx)
        - [Tableau view](https://ctsedwweb.ee.doe.gov/Annual/Report/TableauView.aspx?id=5)

### Federal Procurement Data System

Purchasing data.

[https://www.fpds.gov/](https://www.fpds.gov/)

Based on attributes of purchase data, an economic input/output life cycle assessment model may be applied to infer greenhouse gas impact. GSA's Federal Acquisition Services, Office of Policy and Compliance, applies such a model in their GSA dashboard Excel document.

### System for Award Management (SAM)

Some of the FPDS reports (above) have been migrated to [https://sam.gov/](https://sam.gov/).

## Analytic methods

### Economic Input-Output Life Cycle Assessment (EIO-LCA)

Carnegie Mellon hosts an online tool to estimate emissions impact using the EIO-LCA method: [http://www.eiolca.net/](http://www.eiolca.net/)

Given an [NAICS](https://www.census.gov/naics/) sector ID, various impacts (including greenhouse gas emissions) may be estimated per unit of economic activity.
