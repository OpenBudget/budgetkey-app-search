import { Component, Input, Inject, OnInit } from '@angular/core';

import { THEME_ID_TOKEN } from 'budgetkey-ng2-components';

import { DocResultEntry } from '../model';

import * as moment from 'moment';

type StringOrFunc = string | ((any) => string);

interface Parameter {
  // Colors:
  primaryColor: StringOrFunc;
  secondaryColor: StringOrFunc;
  tertiaryColor?: StringOrFunc;
  bgColor: StringOrFunc;
  tagColor: StringOrFunc;

  // Top line:
  tag?: StringOrFunc;
  postTag?: StringOrFunc;
  preAmount?: StringOrFunc;
  amount?: StringOrFunc;

  // Main body:
  bodyStyle?: StringOrFunc;
  title?: StringOrFunc;
  partyFrom?: StringOrFunc;
  partyTo?: StringOrFunc;
  arrowKind?: StringOrFunc;
  mainId?: StringOrFunc;
  rightIcon?: StringOrFunc;
  leftIcon?: StringOrFunc;

  // Bottom line:
  bottomLineText?: StringOrFunc;
  bottomLineLabel?: StringOrFunc;
  bottomLineLabelStyle?: StringOrFunc;
  bottomLineTextOpacity?: StringOrFunc;
}


@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {

  @Input() item: DocResultEntry;
  @Input() index: number;
  @Input() kind: string;
  @Input() horizontal = false;
  @Input() bare = false;

  private PARAMETERS: { [s: string]: Parameter; } = {
    // // ENTITIES
    // Companies
    'org/company': <Parameter>{
      primaryColor: '#3e4e59',
      secondaryColor: '#e8f5ff',
      tertiaryColor: '#abbbc6',
      bgColor: '#ffffff',
      tagColor: '#3e4e59',
      tag: ':kind_he',
      preAmount: () => `הכנסות&nbsp;מהמדינה ${this.threeYears()}&nbsp;-&nbsp;${this.thisYear()}`,
      amount: (x) => `${this.format_number(x.received_amount)} ₪`,

      // Main body:
      title: ':name',
      mainId: '#:id',

      // Bottom line:
      bottomLineText: (x: any) => (x.details.description ?
        `<strong>מטרות</strong>: ${x.details.description}` :
        (x.details.goals ?
          `<strong>מטרות</strong>: ${x.details.goals}` :
          (x.details.address_lines ?
            `<strong>כתובת</strong>: ${x.details.address_lines.join(', ')}` : null
          )
        )
      )
    },
    // Associations
    'org/association': <Parameter>{
      primaryColor: '#235000',
      secondaryColor: '#eaf9de',
      tertiaryColor: '#abba9f',
      bgColor: '#ffffff',
      tagColor: '#235000',
      tag: ':kind_he',
      preAmount: (x) => (
        this.socialmapAmount() ?
        (x.details['last_report_year'] ?
          `מחזור&nbsp;כספי&nbsp;שנתי לשנת&nbsp;${x.details['last_report_year']}` :
          `מחזור&nbsp;כספי&nbsp;שנתי לשנת&nbsp;הדיווח&nbsp;האחרונה`
        ) :
        (`הכנסות&nbsp;מהמדינה ${this.threeYears()}&nbsp;-&nbsp;${this.thisYear()}`)
      ),
      amount: (x) => (
        this.socialmapAmount() ?
        (`${this.format_number(x.details.yearly_turnover)} ₪`) :
        (`${this.format_number(x.received_amount)} ₪`)
      ),

      // Main body:
      title: ':name',
      mainId: '#:id',

      // Bottom line:
      bottomLineText: (x: any) => (x.details.objective ?
        `<strong>מטרות</strong>: ${x.details.objective}` :
        (x.details.activity_region_list ?
          `<strong>איזורי פעילות</strong>: ${x.details.activity_region_list.join(', ')}` :
          (x.details.address_lines ?
            `<strong>כתובת</strong>: ${x.details.address_lines.join(', ')}` : null
          )
        )
      )
    },
    // Municipalities
    'org/municipality': <Parameter>{
      primaryColor: '#564a2a',
      secondaryColor: '#fef2d2',
      tertiaryColor: '#564a2a',
      bgColor: '#ffffff',
      tagColor: '#564a2a',

      tag: ':kind_he',
      postTag: ':details.status_municipal_2015',
      preAmount: () => `הכנסות&nbsp;מהמדינה ${this.threeYears()}&nbsp;-&nbsp;${this.thisYear()}`,
      amount: (x) => `${this.format_number(x.received_amount)} ₪`,

      // Main body:
      title: ':name',
      mainId: '#:id',

      // Bottom line:
      bottomLineText: (x: any) =>
        `אזור ${x.details.district_2015} | ` +
        `${this.format_number(x.details.total_population_end_2015_1000s * 1000)} תושבים | ` +
        `אשכול ${x.details.index_socioeconomic_2013_cluster_from_1_to_10_1_lowest_most}/10`
    },
    // Other entities
    'org': <Parameter>{
      primaryColor: '#444',
      secondaryColor: '#eee',
      tertiaryColor: '#444',
      bgColor: '#ffffff',
      tagColor: '#444',

      tag: ':kind_he',
      preAmount: () => `הכנסות&nbsp;מהמדינה ${this.threeYears()}&nbsp;-&nbsp;${this.thisYear()}`,
      amount: (x) => `${this.format_number(x.received_amount)} ₪`,

      // Main body:
      title: ':name',
      mainId: '#:id',
    },
    // // BUDGET ITEMS
    'budget': <Parameter>{
      // Colors:
      // .func-cls-1 { .budget-func-cls-color(#5C7899, #6092CC, #D7E7FA, #EBF2FA); } //Blue
      // .func-cls-2 { .budget-func-cls-color(#7A6B99, #9281B8, #E4DCF5, #F1EDF7); } //Purple
      // .func-cls-3 { .budget-func-cls-color(#6D8F89, #75BFB3, #CEF0EB, #EBF7F5); } //Cyan
      // .func-cls-4 { .budget-func-cls-color(#A67453, #F0A16C, #FFD1B3, #FCF0E8); } //Orange
      // .func-cls-5 { .budget-func-cls-color(#768275, #8EA38C, #D4E3D1, #ECF2EB); } //Greenish
      // .func-cls-6 { .budget-func-cls-color(#998282, #C7B3B3, #EDE4E4, #F7F2F2); } //Sepia
      // .func-cls-7 { .budget-func-cls-color(#8C8231, #F2E22E, #FFF7B3, #FCFADC); } //Yellow
      // .func-cls-8 { .budget-func-cls-color(#313131, #2E2E2E, #B3B3B3, #DCDCDC); } //Yellow
      primaryColor: '#7a6b99',
      secondaryColor: '#e4dcf5',
      tertiaryColor: '#b4a0de',
      bgColor: '#ffffff',
      tagColor: '#7a6b99',

      // Top line:
      tag: (x) => x.code[0] === 'C' ? 'נושא תקציבי' : 'סעיף תקציבי',
      amount: (x) => `${this.format_number(x.net_revised)}&nbsp;₪`,

      // Main body:
      title: ':title',
      mainId: (x) => (!x || !x['nice-code'] || !x['nice-code'].length || x['nice-code'][0] === 'C') ? '' : ':nice-code',

      // Bottom line:
      bottomLineText: ':nice-breadcrumbs',
      bottomLineLabel: ':nice-short-category',
      bottomLineLabelStyle: 'circle'
    },
    // // TRANSACTIONS
    // Contracts:
    'contract-spending': <Parameter>{
      // Colors:
      primaryColor: '#19008f',
      secondaryColor: '#fffbf2',
      bgColor: '#fffefc',
      tagColor: '#19008f',

      // Top line:
      tag: 'התקשרות רכש',
      postTag: (x) => x.contract_is_active ? 'פעילה' : 'הסתיימה',
      amount: (x) => `${this.format_number(x['volume'])}&nbsp;₪`,

      // Main body:
      bodyStyle: 'ticket',
      title: ':purpose',
      partyFrom: ':publisher_name',
      partyTo: (x) => x['entity_name'] || x['supplier_name'][0],
      arrowKind: 'left',

      // Bottom line:
      bottomLineText: (x) => this.contractPeriodDetails(x),
      bottomLineTextOpacity: '0.5',
    },
    // Supports:
    'supports': <Parameter>{
      // Colors:
      primaryColor: '#235000',
      secondaryColor: '#fffbf2',
      bgColor: '#fffefc',
      tagColor: '#235000',

      // Top line:
      tag: 'תמיכה תקציבית',
      postTag: (x) => x['request_type'] === 'א3' ? '3' + 'א' : x['request_type'],
      amount: (x) => `${this.format_number(x['amount_total'])}&nbsp;₪`,

      // Main body:
      bodyStyle: 'ticket',
      title: (x) => this.lastSupportPayment(x)['support_title'],
      partyFrom: (x) => this.lastSupportPayment(x)['supporting_ministry'],
      partyTo: (x) => x['entity_name'] || x['recipient'],
      arrowKind: 'left',

      // Bottom line:
      bottomLineText: (x) => this.supportPeriodDetails(x),
      bottomLineTextOpacity: '0.5',
    },
    // // OPEN CALLS
    // Exemptions:
    'tenders/exemptions': <Parameter>{
      // Colors:
      primaryColor: '#19008f',
      secondaryColor: '#fffbf2',
      bgColor: '#fffbf2',
      tagColor: '#19008f',

      // Top line:
      tag: ':tender_type_he',
      postTag: ':simple_decision_long',
      amount: (x) => `${this.format_number(x.volume)}&nbsp;₪`,

      // Main body:
      bodyStyle: 'dashing',
      title: ':description',
      partyFrom: ':publisher',
      partyTo: ':awardees_text',
      arrowKind: 'left-dashed',

      // Bottom line:
      bottomLineText: (x) =>
        x['last_update_date'] ?
        `עודכן לאחרונה: ${moment(x['last_update_date']).format('DD/MM/YYYY')}`
        : null,
      // bottomLineLabel?: StringOrFunc;
      // bottomLineLabelStyle?: StringOrFunc;
      bottomLineTextOpacity: '0.5'
    },
    // Tenders:
    'tenders': <Parameter>{
      // Colors:
      primaryColor: '#19008f',
      secondaryColor: '#fffbf2',
      bgColor: '#fffbf2',
      tagColor: '#19008f',

      // Top line:
      tag: ':tender_type_he :simple_decision',
      postTag: ':regulation',

      // Main body:
      bodyStyle: 'dashing',
      title: ':description',
      partyFrom: ':publisher',
      partyTo: ':awardees_text',
      arrowKind: 'left-dashed',

      // Bottom line:
      bottomLineText: (x) =>
        x['last_update_date'] ?
        `עודכן לאחרונה: ${moment(x['last_update_date']).format('DD/MM/YYYY')}`
        : null,
      bottomLineLabel: this.remainingTime,
      bottomLineLabelStyle: 'ribbon',
      bottomLineTextOpacity: '0.5'
    },
    // Calls for Bids:
    'calls_for_bids': <Parameter>{
      // Colors:
      primaryColor: '#235000',
      secondaryColor: '#fffbf2',
      bgColor: '#fffbf2',
      tagColor: '#235000',

      // Top line:
      tag: ':tender_type_he :decision',

      // Main body:
      bodyStyle: 'dashing',
      title: ':page_title',
      partyFrom: ':publisher',

      // Bottom line:
      bottomLineText: (x) => x['start_date'] ? `תאריך פרסום: ${moment(x.start_date).format('DD/MM/YYYY')}` : null,
      bottomLineLabel: this.remainingTime,
      bottomLineLabelStyle: 'ribbon',
      bottomLineTextOpacity: '0.5'
    },
    // Support Criteria:
    'support_criteria': <Parameter>{
      // Colors:
      primaryColor: '#235000',
      secondaryColor: '#fffbf2',
      bgColor: '#fffbf2',
      tagColor: '#235000',

      // Top line:
      tag: ':tender_type_he',

      // Main body:
      bodyStyle: 'dashing',
      title: ':page_title',
      partyFrom: ':publisher',

      // Bottom line:
      bottomLineText: (x) => x['start_date'] ? `תאריך פרסום: ${moment(x.start_date).format('DD/MM/YYYY')}` : null,
      bottomLineLabel: this.remainingTime,
      bottomLineLabelStyle: 'ribbon',
      bottomLineTextOpacity: '0.5'
    },
    // // PEOPLE:
    // People
    'people': <Parameter>{
      // Colors:
      primaryColor: '#91a0c2',
      secondaryColor: '#fafafa',
      tertiaryColor: '#91a0c2',
      bgColor: '#ffffff',
      tagColor: '#91a0c2',

      // Top line:
      tag: 'אנשים',
      preAmount: (x) => x.details.length > 1 ? `${x.details.length} רשומות` : 'רשומה אחת',

      // Main body:
      title: ':key',
      rightIcon: 'face',

      // Bottom line:
      bottomLineText: '', // TODO: Complete'
    },
    // // TRANSFERS:
    // Budget Changes
    'national-budget-changes': <Parameter>{
      // Colors:
      primaryColor: '#7d7d7d',
      secondaryColor: '#f5f5f5',
      bgColor: '#ffffff',
      tagColor: '#7d7d7d',

      // Top line:
      tag: 'העברה תקציבית',
      postTag: (x) => x.change_type_name && x.change_type_name.length > 0 ?
        (x.committee_id && x.committee_id.length > 0 && x.committee_id[0] ?
          x.change_type_name[0] + ' (פניה #' + x.committee_id[0] + ')' :
          x.change_type_name[0]
        ) : null,
      amount: (x) => `${this.format_number(x.amount)} ₪`,


      // Main body:
      title: ':page_title',
      partyFrom: (x) => x['summary']['from'].map((i) => i[2]).join(', '),
      partyTo: (x) => x['summary']['to'].map((i) => i[2]).join(', '),
      arrowKind: 'left-dashed',

      // Bottom line:
      bottomLineText: (x) =>
          '<strong>מספר פניה:</strong> :transaction_id | ' +
          (x['pending'] && (x['pending'][0] ?
            '<strong>ממתינה לאישור</strong>'
            : ((x['date'] && x['date'].length > 0) ?
                `<strong>אושרה ב:</strong> ${moment(x['date'][0]).format('DD/MM/YYYY')}`
                : 'מועד אישור לא ידוע')))
    },
    // // PUBLICATIONS
    // Government Decisions
    'gov_decisions': <Parameter>{
      // Colors:
      primaryColor: '#19008f',
      secondaryColor: '#ebe9f5',
      tertiaryColor: '#a4a1b3',
      bgColor: '#ffffff',
      tagColor: '#19008f',

      // Top line:
      tag: ':policy_type',
      postTag: (x) => x['unit'] && x['unit'].length < 36 ? ':unit' : null,
      preAmount: (x) => moment(x['publish_date']).format('DD/MM/YYYY'),

      // Main body:
      title: ':title',
      mainId: (x) => x['procedure_number_str'] ? '#:procedure_number_str' : null,
      leftIcon: 'emblem-of-israel',

      // Bottom line:
      bottomLineText: '<strong>מפרסם:</strong> :office'
    },
    // // ACTIVITIES
    // Government Activities
    'activities': <Parameter>{
      // Colors:
      primaryColor: '#19008f',
      secondaryColor: '#ebe9f5',
      tertiaryColor: '#a4a1b3',
      bgColor: '#ffffff',
      tagColor: '#19008f',

      // Top line:
      tag: ':kind_he',
      partyFrom: (x) => x['office'] + '/' + x['unit'] + (x['subunit'] ? '/' + x['subunit'] : ''),
      preAmount: (x) => {
        const h = x['manualBudget'] || [];
        for (const i of h) {
          if (i.approved) {
            return 'התקציב ב-' + i.year;
          }
        }
      },
      amount: (x) => {
        const h = x['manualBudget'] || [];
        for (const i of h) {
          if (i.approved) {
            return `${this.format_number(i.approved)} ₪`;
          }
        }
      },

      // Main body:
      title: ':name',

      // Bottom line:
      bottomLineText: ':description',
    },
    // // REPORTS
    // NGO Activity Report
    'reports/ngo-activity-report': <Parameter>{
      // Colors:
      primaryColor: '#180a42',
      secondaryColor: '#fe8255',
      bgColor: '#ffffff',
      tagColor: '#180a42',

      // Top line:
      tag: 'תחום פעילות',

      // Main body:
      title: ':title',

      // Bottom line:
      bottomLineText: '<strong>מספר ארגונים:</strong> :details.report.total.total_amount',
    },
    // District Report
    'reports/ngo-district-report': <Parameter>{
      // Colors:
      primaryColor: '#180a42',
      secondaryColor: '#fe8255',
      bgColor: '#ffffff',
      tagColor: '#180a42',

      // Top line:
      tag: 'אזור פעילות',

      // Main body:
      title: ':title',

      // Bottom line:
      bottomLineText: '<strong>מספר ארגונים:</strong> :details.report.total.count',
    },

  };

  public p: Parameter;

  constructor(@Inject(THEME_ID_TOKEN) private theme_id: any) { }

  ngOnInit() {
    const parts = this.item.source.doc_id.split('/');
    this.p = <Parameter>{};
    const template = (
      this.PARAMETERS[parts[0] + '/' + parts[1]] ||
      this.PARAMETERS[parts[0]] ||
      this.PARAMETERS['']
    );
    if (template) {
      for (const el of Object.entries(template)) {
        const k = el[0];
        let v = el[1];
        if (typeof v === 'function') {
          v = v(this.item.source);
        }
        if (typeof v === 'string') {
          v = v.replace(/:([-a-z0-9_.]+)/g, (_, x) => this.get(x));
        } else {
          v = null;
        }
        this.p[k] = v;
      }
    }
    if (this.bare) {
      this.p.primaryColor = 'black';
      this.p.secondaryColor = '#f9f9f9';
      this.p.bgColor = 'white';
    }
  }


  threeYears() {
    const dt = new Date();
    dt.setDate(dt.getDate() - 180);
    return dt.getFullYear() - 3;
  }

  thisYear() {
    const dt = new Date();
    return dt.getFullYear();
  }

  format_number(x: number) {
    if (x) {
      let fracDigits = 0;
      if (x < 1000) {
        fracDigits = 2;
      }
      return '<span class="number">' +
                x.toLocaleString('en-US', {style: 'decimal',
                                           maximumFractionDigits: fracDigits}) +
             '</span>';
    } else {
      return '-';
    }
  }

  get_field(item: any, parts: string[]) {
    while (item && parts.length > 0) {
      const part = parts.shift();
      item = item[part];
    }
    return item;
  }

  get(field: string, default_value?: string) {
    if (field) {
      return this.get_field(this.item.source, field.split('.')) || default_value || '';
    }
    return default_value || '';
  }

  fadeoff(primary?: boolean) {
    if (primary) {
      return `linear-gradient(to left, ${this.p.bgColor}00 0%, ${this.p.bgColor}ff 100%)`;
    } else {
      return `linear-gradient(to left, ${this.p.secondaryColor}00 0%, ${this.p.secondaryColor}ff 100%)`;
    }
  }

  socialmapAmount() {
    return this.theme_id === 'socialmap' && this.item.source.details['yearly_turnover'];
  }

  contractPeriodDetails(x) {
    const r: string[] = [];
    if (x['order_date']) {
      r.push('תקופת ההתקשרות');
      let rr = moment(x['order_date']).format('DD/MM/YYYY') + ' - ';
      if (x['end_date']) {
        rr += moment(x['end_date']).format('DD/MM/YYYY');
      } else if (x['contract_is_active']) {
        rr += 'התקשרות פעילה';
      } else {
        rr += 'התקשרות לא פעילה';
      }
      r.push(rr);
    } else if (x['contract_is_active']) {
      r.push('התקשרות פעילה');
    } else {
      r.push('התקשרות לא פעילה');
    }
    return r.join(' ');
  }

  supportPeriodDetails(x) {
    const lastYear = x['last_payment_year'];
    if (!lastYear || lastYear === x['year_requested']) {
      return `שנת תמיכה: ${x['year_requested']}`;
    } else {
      return `תקופת תמיכה: ${x['year_requested']} - ${lastYear}`;
    }
  }

  lastSupportPayment(x) {
    return x['payments'][x['payments'].length - 1];
  }

  href() {
    const doc_id = this.item.source.doc_id;
    let base = 'https://next.obudget.org';
    if (doc_id.indexOf('activities/gov_social_service') === 0) {
      base = 'https://www.socialpro.org.il';
    }
    return base + '/i/' + doc_id + '?li=' + this.index + (!this.bare && this.theme_id ? '&theme=' + this.theme_id : '');
  }

  remainingTime(x) {
    if (x.claim_date) {
      const days = -moment().diff(moment(x.claim_date), 'days');
      if (days > 0) {
        if (days === 1) {
          return '<strong>יום אחד</strong> נותר להגשה';
        } else {
          return `<strong>${days} ימים</strong> נותרו להגשה`;
        }
      }
    }
  }
}
