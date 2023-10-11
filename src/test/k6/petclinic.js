import { sleep, group } from 'k6'
import http from 'k6/http';

const BASE_URL = 'https://petclinic.redsand-9dba3237.southeastasia.azurecontainerapps.io'

export const options = {
  thresholds: { http_req_duration: ['p(99)<600', 'p(95)<300'], http_req_failed: ['rate<0.1'] },
  scenarios: {
    petclinic: {
      executor: 'ramping-vus',
      gracefulRampDown: '5s',
      gracefulStop: '5s',
      stages: [
        { target: 8, duration: '5s' },
        { target: 8, duration: '60s' },
        { target: 0, duration: '5s' },
      ],
      exec: 'petclinic',
    },
  },
};

export function petclinic() {

  group('home', function () {
    http.get(BASE_URL)
    sleep(Math.random() * 5)
  })

  group('get all owners', function () {
    http.get(BASE_URL + '/owners?lastName=')
    sleep(Math.random() * 5)
  })

  group('find owner', function () {
    http.get(BASE_URL + '/owners/find')
    sleep(Math.random() * 5)
  })

  group('get owner', function () {
    http.get(BASE_URL + '/owners/3')
    sleep(Math.random() * 5)
  })

  group('edit owner', function () {
    http.get(BASE_URL + '/owners/3/edit')
    sleep(Math.random() * 5)
  })

  group('new owner', function () {
    http.get(BASE_URL + '/owners/new')
    sleep(Math.random() * 5)
    http.post(
      BASE_URL + '/owners/new',
      {
        firstName: 'US',
        lastName: 'Microsoft',
        address: 'One Microsoft Way',
        city: 'Redmond',
        telephone: '800-426-9400',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: BASE_URL,
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(Math.random() * 5)
    http.post(
      BASE_URL + '/owners/new',
      {
        firstName: 'Singapore',
        lastName: 'Microsoft',
        address: '182 Cecil St',
        city: 'Singapore',
        telephone: '800-1013-659',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: BASE_URL,
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(Math.random() * 5)
  })

  group('get all vets', function () {
    http.get(BASE_URL + '/vets.html')
    sleep(Math.random() * 5)
  })

  group('oups', function () {
    http.get(BASE_URL + '/oups')
    sleep(Math.random() * 5)
  })

  group('new pet', function () {
    http.get(BASE_URL + '/owners/11/pets/new')
    sleep(Math.random() * 5)
    http.post(
      BASE_URL + '/owners/11/pets/new',
      {
        id: '',
        name: 'Little Sweet',
        birthDate: '2021-11-01',
        type: 'dog',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: BASE_URL,
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(Math.random() * 5)
  })

}