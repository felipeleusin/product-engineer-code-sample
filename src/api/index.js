import axios from 'axios'

const client = axios.create({
  baseURL: 'https://stg-api.samplicio.us/demand/v2-beta',
})

client.defaults.headers.common.Authorization = '24930D72-0AA7-4EBB-AF8F-398181807A85'

const createRequest = {
  business_unit_id: 1056,
  client_cpi_usd: 5,
  collects_pii: true,
  expected_completes: 10,
  expected_completion_loi: 10,
  expected_incidence_rate: 0.1,
  fraud_profile: true,
  fraud_profile_threshold: 13,
  industry: 'education',
  live_url: 'https://www.samplesurvey.com/',
  locale: 'eng_us',
  name: 'Test Survey',
  priority: 13,
  quantity_calc_type: 'prescreens',
  project_id: 124973,
  relevant_id: true,
  status: 'pending',
  study_type: 'ihut',
  survey_cpi_usd: 5,
  test_url: 'https://www.samplesurvey.com/test',
  unique_ip: true,
  unique_pid: true,
  verify_callback: true,
}

export { client, createRequest }
