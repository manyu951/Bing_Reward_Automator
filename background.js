let totals = 40; // Default value

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateTotals') {
        totals = message.totals;
        console.log('Updated totals in background.js:', totals);
    }
});
let veri = false; // Default value

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'stopBb') {
        veri = message.stopB;
        console.log('Updated totals in background.js:', totals);
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "openTabs") {
        openTabs();
    }
});

let isRunning = false;
var kitnahuaa = 0;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getIsRunning') {
    sendResponse({ isRunning });
  }
  else if(message.action === 'valueoft'){
    sendResponse({kitnahuaa});
  }
});


// Make sure to export the functions if needed
chrome.runtime.openTabs = openTabs;

function openTabs(){
    var searchterm = [
        'google', 'iter', 'yahoo', 'gmail', 'cricket', 'dr br ambedkar', 'Dr br ambedkar university', 'Dr br Ambedkar University Lucknow', 'delhi university',
        'patna', 'delhi', 'punjab', 'Gujrat', 'mumbai', 'bharat', 'bharat map', 'zoo near me', 'world largest bulding',
        'ganga', 'kolkata', 'kiit bhubneswar', 'iit', 'iit delhi', 'nit patna', 'hindi', 'bhojpuri song', 'hindi music',
        'nandra modi', 'news', 'new delhi', 'kerala', 'B.tech', 'BCA', 'college near me', 'thik tank of japan', 'latest news',
        'laptop', 'ram', 'ssd speed', 'book store', 'koko fm', 'imdb', 'earbuds under 2000', 'Best mobile phone under 20000', 'microsoft reward',
        'pvr near me', 'hindi movies', 'delivery courier', 'blue dart', 'blue dart customer care', 'epfo survey', 'valentine week', 'mumbai coastal road', 'golden line delhi metro stations',
        'shreyas iyer', 'pnb share news', 'paytm share price', 'nifty today', 'irfc share price', 'sbi share price', 'sensex', 'tata motors share price', 'reliance share price',
        'Sigma methodologies', 'Lean manufacturing principles', 'Kaizen practices', 'Total Quality Management (TQM)', 'Continuous improvement strategies', 'Supply chain optimization', 'Inventory management techniques', 'Just-in-time (JIT) inventory', 'Demand forecasting models', 'Supplier relationship management',
        'Logistics and distribution management', 'Warehouse efficiency', 'Procurement best practices', 'Contract negotiation skills', 'International trade regulations', 'Import/export procedures', 'Customs clearance processes', 'Tariff classifications', 'Trade finance instruments', 'Trade compliance', 'Export control regulations',
        'International shipping logistics', 'Cross-border e-commerce', 'Global market entry strategies', 'Market segmentation analysis', 'Competitive intelligence', 'Market research methodologies', 'Consumer behavior studies', 'Brand positioning strategies', 'Product differentiation tactics', 'Pricing strategies',
        'Promotion strategies', 'Distribution channel management', 'Retail merchandising techniques', 'Sales forecasting methods', 'Customer relationship management (CRM)', 'Sales force automation', 'Lead generation tactics', 'Sales closing techniques', 'Sales performance metrics', 'Key account management',
        'Sales training programs', 'Customer service excellence', 'Customer satisfaction surveys', 'Customer retention strategies', 'Loyalty programs', 'Complaint resolution processes', 'Voice of the Customer (VoC) analysis', 'Net Promoter Score (NPS)', 'Customer journey mapping', 'User personas',
        'Usability testing', 'User interface (UI) design principles', 'User experience (UX) design principles', 'Interaction design', 'Information architecture', 'Wireframing and prototyping', 'Usability heuristics', 'Accessibility standards', 'User testing methodologies', 'A/B testing',
        'Multivariate testing', 'Conversion rate optimization (CRO)', 'Web analytics', 'Clickstream analysis', 'Heatmap analysis', 'Session replay tools', 'Conversion funnel analysis', 'Landing page optimization', 'Search engine optimization (SEO)', 'On-page SEO techniques', 'Off-page SEO techniques',
        'Local SEO strategies', 'Technical SEO audits', 'SEO keyword research', 'SEO content optimization', 'SEO link building strategies', 'SEO performance tracking', 'Pay-per-click (PPC) advertising', 'Google Ads campaigns', 'Bing Ads campaigns', 'Display advertising', 'Retargeting campaigns',
        'Social media advertising', 'Native advertising', 'Video advertising', 'Affiliate marketing programs', 'Email marketing campaigns', 'Marketing automation platforms', 'Content management systems (CMS)', 'Content creation tools', 'Content curation strategies', 'Content calendar planning', 'Content distribution channels',
        'Content syndication networks', 'Content performance analytics', 'Social media management tools', 'Social media content strategy', 'Social media listening', 'Community management', 'Influencer marketing campaigns', 'Social media analytics', 'Social media advertising platforms', 'Social media engagement metrics', 'Social media ROI measurement',
        'Social media crisis management', 'Online reputation management', 'Brand monitoring tools', 'Crisis communication plans', 'Brand storytelling techniques', 'Brand identity development', 'Brand positioning statements', 'Brand equity measurement', 'Brand loyalty programs', 'Brand ambassador programs', 'Brand licensing agreements',
        'Brand partnerships', 'Brand extensions', 'Brand guidelines', 'Brand management software', 'Market segmentation strategies', 'Target audience identification', 'Customer profiling techniques', 'Psychographic segmentation', 'Behavioral segmentation', 'Geographic segmentation', 'Demographic segmentation', 'B2B marketing strategies',
        'B2C marketing strategies', 'Account-based marketing (ABM)', 'Relationship marketing', 'Direct marketing', 'Inbound marketing', 'Outbound marketing', 'Content marketing strategies', 'Email marketing automation', 'Marketing funnel optimization', 'Lead nurturing campaigns', 'Marketing attribution models', 'Customer lifecycle marketing',
        'Lifecycle email marketing', 'Cross-channel marketing campaigns', 'Omnichannel marketing strategies', 'Integrated marketing communications (IMC)', 'Marketing mix optimization', 'Marketing performance measurement', 'Marketing ROI analysis', 'Marketing budget allocation', 'Marketing technology stack', 'Marketing automation platforms',
        'Customer data platforms (CDP)', 'Customer relationship management (CRM) systems', 'Email marketing platforms', 'Content management systems (CMS)', 'Analytics and reporting tools', 'Social media management platforms', 'Marketing project management tools', 'Marketing collaboration platforms', 'Marketing resource management (MRM) software',
        'Digital asset management (DAM) systems', 'Marketing cloud solutions', 'Marketing attribution platforms', 'A/B testing tools', 'Heatmap tools', 'Customer journey mapping tools', 'Conversion rate optimization (CRO) software', 'Search engine optimization (SEO) tools', 'Paid advertising platforms', 'Social media analytics tools',
        'Marketing automation certification programs', 'Digital marketing courses', 'Content marketing certifications', 'Social media marketing training', 'Email marketing workshops', 'Marketing analytics bootcamps', 'Digital marketing conferences', 'Marketing workshops', 'Marketing webinars', 'Marketing podcasts', 'Marketing blogs',
        'Marketing books', 'Marketing magazines', 'Marketing newsletters', 'Marketing forums', 'Marketing communities', 'Marketing associations', 'Marketing networking events', 'Marketing mentorship programs', 'Marketing consultancy services', 'Marketing agencies', 'Marketing freelancers', 'Marketing recruiters', 'Marketing career paths',
        'Marketing job roles', 'Marketing internships', 'Marketing apprenticeships', 'Marketing graduate programs', 'Marketing certifications', 'Marketing degrees', 'Marketing courses', 'Marketing workshops', 'Marketing bootcamps', 'Marketing hackathons', 'Marketing conferences', 'Marketing summits', 'Marketing expos', 'Marketing competitions',
        'Marketing scholarships', 'Marketing grants', 'Marketing fellowships', 'Marketing sponsorships', 'Marketing awards', 'Marketing honors societies', 'Marketing think tanks', 'Marketing', 'Artificial intelligence', 'Machine learning', 'Data science', 'Robotics', 'Virtual reality', 'Augmented reality', 'Blockchain technology',
        'Cryptocurrency', 'Cybersecurity', 'Internet of Things (IoT)', 'Cloud computing', 'Quantum computing', 'Renewable energy', 'Climate change', 'Sustainable development', 'Environmental conservation', 'Green technology', 'Biotechnology', 'Genetics', 'Bioinformatics', 'Space exploration', 'Astronomy', 'Astrophysics', 'Cosmology',
        'Particle physics', 'Quantum mechanics', 'Nuclear physics', 'Organic chemistry', 'Inorganic chemistry', 'Physical chemistry', 'Analytical chemistry', 'Environmental chemistry', 'Pharmaceutical sciences', 'Pharmacology', 'Drug discovery', 'Immunology', 'Neurology', 'Psychology', 'Psychiatry', 'Sociology', 'Anthropology',
        'Archaeology', 'Linguistics', 'Philosophy', 'Ethics', 'Theology', 'Comparative religion', 'Mythology', 'History', 'Archaeology', 'Political science', 'Economics', 'Sociology', 'Anthropology', 'Geography', 'Cultural studies', 'Literature', 'Poetry', 'Fiction', 'Non-fiction', 'Journalism', 'Creative writing',
        'Screenwriting', 'Film studies', 'Theater', 'Performing arts', 'Visual arts', 'Fine arts', 'Photography', 'Graphic design', 'Illustration', 'Animation', 'Fashion design', 'Interior design', 'Architecture', 'Landscape architecture', 'Urban planning', 'Civil engineering', 'Mechanical engineering', 'Electrical engineering',
        'Aerospace engineering', 'Chemical engineering', 'Materials science', 'Nanotechnology', 'Biomedical engineering', 'Marine engineering', 'Agricultural science', 'Agronomy', 'Horticulture', 'Veterinary science', 'Animal husbandry', 'Food science', 'Culinary arts', 'Gastronomy', 'Nutrition', 'Dietetics', 'Physical therapy',
        'Occupational therapy', 'Speech therapy', 'Nursing', 'Medicine', 'Surgery', 'Public health', 'Epidemiology', 'Healthcare administration', 'Health informatics', 'Health policy', 'Social work', 'Counseling', 'Education', 'Pedagogy', 'Andragogy', 'Curriculum design', 'Instructional design', 'Educational technology',
        'E-learning', 'Distance learning', 'Adult education', 'Vocational training', 'Special education', 'Early childhood education', 'Higher education', 'Student affairs', 'Student development', 'Academic advising', 'Student engagement', 'Student retention', 'Student success', 'Student leadership', 'Student organizations',
        'Student activities', 'Student government', 'Student services', 'Student counseling', 'Student housing', 'Student life', 'Student employment', 'Student finance', 'Student loans', 'Student scholarships', 'Student grants', 'Student fellowships', 'Student internships', 'Student jobs', 'Student career services',
        'Student health services', 'Student wellness', 'Student diversity', 'Student inclusion', 'Student equity', 'Student accessibility', 'Student support services', 'Student empowerment', 'Student advocacy', 'Student activism', 'Student voice', 'Student development theory', 'Student learning outcomes', 'Student assessment',
        'Student evaluation', 'Student data', 'Student privacy', 'Student records', 'Student information systems', 'Student success initiatives', 'Student retention strategies', 'Student engagement strategies', 'Student leadership development', 'Student affairs administration', 'Student affairs assessment', 'Student affairs programming',
        'Student affairs research', 'Student affairs best practices', 'Student affairs trends', 'Student affairs conferences', 'Student affairs associations', 'Student affairs professional development', 'Student affairs mentorship', 'Student affairs networking', 'Student affairs consultancy', 'Student affairs coaching', 'Student affairs workshops',
        'Student affairs publications', 'Student affairs podcasts', 'Student affairs blogs', 'Student affairs newsletters', 'Student affairs forums', 'Student affairs communities', 'Student affairs events', 'Student affairs webinars', 'Student affairs awards', 'Student affairs honors societies', 'Student affairs think tanks',
        'Robotics engineering', 'Automation technologies', 'Industrial automation', 'Robotics programming', 'Human-robot interaction', 'Autonomous vehicles', 'Drone technology', 'Unmanned aerial vehicles (UAVs)', 'Aerospace engineering', 'Spacecraft design', 'Satellite technology', 'Space exploration missions', 'Space tourism', 'Extraterrestrial colonization',
        'Lunar exploration', 'Mars exploration', 'Planetary science', 'Astrobiology', 'Exoplanet discovery', 'Space telescopes', 'Cosmic phenomena', 'Dark matter', 'Dark energy', 'Black holes', 'Gravitational waves', 'Quantum field theory', 'String theory', 'Unified field theory', 'Particle accelerators', 'Quantum entanglement',
        'Quantum teleportation', 'Quantum computing algorithms', 'Quantum cryptography', 'Quantum supremacy', 'Quantum sensors', 'Quantum materials', 'Carbon nanotubes', 'Graphene applications', 'Nanomedicine', 'Nanoelectronics', 'Nanomaterials synthesis', 'Nanophotonics', 'DNA nanotechnology', 'Bioinformatics tools', 'Genetic engineering',
        'Genomic sequencing', 'CRISPR technology', 'Stem cell research', 'Regenerative medicine', 'Precision medicine', 'Personalized healthcare', 'Immunotherapy', 'Vaccine development', 'Drug delivery systems', 'Pharmacogenomics', 'Neuropharmacology', 'Brain-computer interfaces', 'Neuroprosthetics', 'Neuromorphic computing', 'Cognitive neuroscience',
        'Brain mapping', 'Behavioral economics', 'Game theory', 'Decision theory', 'Behavioral psychology', 'Cognitive psychology', 'Developmental psychology', 'Social psychology', 'Personality psychology', 'Clinical psychology', 'Psychotherapy modalities', 'Psychopharmacology', 'Sociology of organizations', 'Sociology of education', 'Sociology of religion',
        'Medical sociology', 'Sociology of gender', 'Sociology of race and ethnicity', 'Urban sociology', 'Rural sociology', 'Environmental sociology', 'Sociology of technology', 'Political economy', 'International relations theory', 'Comparative politics', 'Political psychology', 'Public policy analysis', 'Policy evaluation', 'Policy implementation',
        'Policy advocacy', 'Macroeconomics', 'Microeconomics', 'Econometrics', 'Behavioral finance', 'Financial derivatives', 'Risk management', 'Investment banking', 'Corporate finance', 'Financial modeling', 'Financial analysis', 'Financial markets', 'Behavioral marketing', 'Neuromarketing', 'Digital marketing trends', 'Social media trends',
        'Content marketing strategies', 'Influencer marketing tactics', 'Marketing analytics', 'Market segmentation strategies', 'Brand management strategies', 'Product lifecycle management', 'Supply chain management', 'Logistics optimization', 'Operations management', 'Quality control methodologies', 'Lean Six Sigma', 'Agile project management',
        'Product management techniques', 'Innovation management', 'Technology adoption models', 'Change management strategies', 'Organizational culture development', 'Diversity and inclusion initiatives', 'Talent management strategies', 'Employee engagement programs', 'Leadership development programs', 'Executive coaching', 'Performance appraisal systems',
        'Compensation and benefits structures', 'Employee wellness initiatives', 'Workplace safety protocols', 'Human resource information systems (HRIS)', 'HR analytics', 'Learning management systems (LMS)', 'Training and development programs', 'Knowledge management systems', 'Employee recognition programs', 'Remote work policies', 'Hybrid work models',
        'Workplace flexibility initiatives', 'Organizational development interventions', 'Conflict resolution strategies', 'Negotiation techniques', 'Mediation processes', 'Cross-cultural communication skills', 'Interpersonal communication strategies', 'Presentation skills', 'Public speaking techniques', 'Persuasion tactics', 'Emotional intelligence',
        'Time management techniques', 'Stress management strategies', 'Work-life balance initiatives', 'Mindfulness practices', 'Wellness retreats', 'Meditation techniques', 'Yoga practices', 'Fitness training programs', 'Nutritional counseling', 'Healthy cooking classes', 'Weight management programs', 'Preventive healthcare initiatives',
        'Holistic wellness approaches', 'Mental health awareness campaigns', 'Community health initiatives', 'Environmental conservation efforts', 'Renewable energy projects', 'Sustainable agriculture practices', 'Eco-friendly transportation options', 'Waste management solutions', 'Biodiversity conservation projects', 'Marine conservation efforts',
        'Climate change mitigation strategies', 'Carbon offset programs', 'Green building initiatives', 'Environmental education programs', 'Sustainable tourism practices', 'Ecotourism destinations', 'Wildlife conservation initiatives', 'Conservation biology research', 'Habitat restoration projects', 'Sustainable development goals (SDGs)',
        'Corporate social responsibility (CSR)', 'Social entrepreneurship ventures', 'Ethical investment strategies', 'Fair trade initiatives', 'Social impact assessment', 'Community development projects', 'Microfinance programs', 'Grassroots advocacy campaigns', 'Nonprofit organizations', 'NGO management', 'Volunteer management', 'Fundraising strategies',
        'Grant writing techniques', 'Social innovation hubs', 'Social justice movements', 'Human rights advocacy', 'Gender equality initiatives', 'Racial justice initiatives', 'LGBTQ+ rights advocacy', 'Disability rights advocacy', 'Indigenous rights advocacy', 'Refugee rights advocacy', 'Child welfare programs', 'Elderly care initiatives',
        'Poverty alleviation efforts', 'Homelessness prevention programs', 'Food security projects', 'Education access programs', 'Youth empowerment initiatives', 'Community empowerment projects', 'Civic engagement initiatives', 'Democratic governance projects', 'Peacebuilding efforts', 'Conflict resolution programs', 'International development projects',
        'Global health initiatives', 'Humanitarian aid missions', 'Disaster relief operations', 'Emergency response systems', 'Crisis management protocols', 'Resilience-building strategies', 'Disaster risk reduction measures', 'Humanitarian logistics', 'Refugee resettlement programs', 'Peacekeeping missions', 'Arms control agreements',
        'Nonproliferation treaties', 'Nuclear disarmament efforts', 'Conflict mediation initiatives', 'Diplomatic negotiations', 'Multilateral diplomacy', 'International law', 'Human rights law', 'Refugee law', 'Environmental law', 'Trade law', 'Intellectual property law', 'Cyber law', 'Criminal law', 'Civil law', 'Administrative law',
        'Constitutional law', 'Public international law', 'Private international law', 'Legal ethics', 'Legal research methodologies', 'Legal writing techniques', 'Legal reasoning skills', 'Legal advocacy strategies', 'Legal technology innovations', 'Legal project management', 'Legal risk management', 'Legal compliance frameworks', 'Legal education reforms',
        'Legal profession diversification', 'Legal career development', 'Legal internships', 'Judicial clerkships', 'Legal externships', 'Law school admissions', 'Bar exam preparation', 'Continuing legal education (CLE)', 'Legal conferences', 'Legal publications', 'Legal podcasts', 'Legal blogs', 'Legal newsletters', 'Legal forums',
        'Legal communities', 'Legal associations', 'Legal networking events', 'Legal mentorship programs', 'Legal consultancy services', 'Legal aid organizations', 'Legal clinics', 'Legal advocacy groups', 'Legal think tanks', 'Legal research institutes', 'Legal policy organizations', 'Legal reform initiatives', 'Legal empowerment programs',
        'Legal rights education', 'Legal literacy campaigns', 'Legal awareness programs', 'Access to justice initiatives', 'Pro bono legal services', 'Public interest law', 'Civil rights litigation', 'Human rights litigation', 'Environmental litigation', 'Class action lawsuits', 'Consumer protection litigation', 'Employment law litigation',
        'Personal injury litigation', 'Medical malpractice litigation', 'Product liability litigation', 'Intellectual property litigation', 'Commercial litigation', 'Corporate litigation', 'Securities litigation', 'Antitrust litigation', 'Insurance litigation', 'Real estate litigation', 'Construction litigation', 'Landlord-tenant disputes'
    ];
        
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      
      // Get the current tab
      chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        // Use the first tab (there should be only one)
        var currentTab = tabs[0];
      
        // Loop through the URLs and open them one by one in the same tab
        let i = 0;
        let abruko = false;
        while(i<totals) {
            isRunning = true;
            if(veri){
                break;
            } 
            if (i % 4 === 0 && i !== 0) {
                for(let j=0;j<91;j++){
                    var urls =  chrome.runtime.getURL('Waitpage.html');//page html page stored in local file
                    chrome.tabs.update(currentTab.id, { url: urls });
                    if(veri){
                        abruko = true;
                        break;
                    }
                    await sleep(10000);
                }
            }
            if(abruko){
                break;
            }
            var rand = parseInt((Math.random()*500));
            var urls =  'https://www.bing.com/search?q='+searchterm[rand]+'&PC=U316&FORM=CHROMN';
            chrome.tabs.update(currentTab.id, { url: urls });
            kitnahuaa = i+1;
            i++;
            if(veri){
                break;
            }
            await sleep(7000);
            
        }
        var urls =  'https://www.bing.com/search?q=';
        chrome.tabs.update(currentTab.id, { url: urls });
        isRunning = false;
        veri=false;
        kitnahuaa = 0;

      });
      
      // Listen for the extension installation or update event
      chrome.runtime.onInstalled.addListener(function () {
      // Perform any setup or initialization here if needed
      console.log("Extension installed or updated.");
      
      // Start opening URLs in the same tab
    
      });
}


