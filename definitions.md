# Definitions

These are definitions defined by [Hawaii State's Office of Enterprise Technology Services](https://ets.hawaii.gov/) for the portfolio of projects.

## Terms

**Application** - Application (software) is a software program or group of programs owned and managed by a department - and used by the department's employees or by citizens/constituents. Also referred to as the system.

**Project** - A project is an effort to create, modify or maintain a specific application, infrastructure or service. In brief, projects are associated with how the work to update the system is done.

**Project Risk** is categorized between Low risk, Moderate, High, Severe Risk.

- Low risk - No risks or a minor risk that can be easily mitigated
- Moderate risk - Some effects on quality, timeline or budget that can be mitigated by project management
- High risk - Remarkable effects on quality, timeline or budget require management support
- Severe risk - Intolerable effects on quality and/or timeline and/or budget of a project requires dedicated management attention and support

**Lifecycle** is a set of date fields for an application's roadmap.

- Lifecycle: Plan (date field) – Enter the date when the application is/was originallyy planned on the department's roadmap the Application is still in the planning state and it is not clear whether and when it will be implemented

- Lifecycle: Active (date field) – Enter the date the application went/goes into production use

- Lifecycle: End of life (date field) – Enter the date the Application is out-of-life and cannot be used anymore

## Investability Calculations

There's currently no calculation for Project invest-ability.

For Applications, for the "TIME" model, the following logic is used:

```java
public String calculateTimeValue(
  int businessCriticality,
  int functionalFit,
  int technicalFit) {
    String value = "missing data";
    if (functionalFit >= 3 && technicalFit >= 3) {
      value = "Invest";
    }
    else if (functionalFit >= 1 && technicalFit >= 3) {
      value = "Tolerate";
    }
    else if (functionalFit >= 2 && technicalFit >= 1 && businessCriticality >= 2) {
      value = "Migrate";
    }
    else if (functionalFit + technicalFit + businessCriticality >= 3) {
      value = "Eliminate";
    }
    return value;
  }
```
