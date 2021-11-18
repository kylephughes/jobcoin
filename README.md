# Jobcoin

Built with React, Typescript, React-Query, Material and React-ChartJs-2

## Dependencies

Verified with the following

Node - 16.8.0
Yarn - 1.22.10
Chrome - 94.0.4606.71

## Run instructions

1. Install yarn if not already downloaded on machine
2. Navigate to project root and run `yarn` to download necessary dependencies
3. Run `yarn start` and navigate to `localhost:3000` once running
4. Run `yarn test` to execute RTL test suite

Addresses with many transactions: `Kyle-Addr & Test-1`

## Features

- Only one address can be logged in per browser at a time but multiple tabs can be open and they will stay in sync by refetching on window focus
- Navigating directly to an address' route (http://localhost:3000/jobcoin/Kyle-Addr) before logging in will still display balances but will put you in a "read only" mode.
- Chart is contained in a resizable box and will adjust as the window size is adjusted for mobile support. A scroll will be added to the chart if it is expanded past the window
- Address' with a `$0` balance will have the transfer widget disabled
- Graph will not display if there is not anything to show
- Transfer widget has validations in an attempt to mimic server validations for a better experience

## Assumptions

- Since any address can login and there is no sensitive data, address is stored in localstorage for simplicity.
