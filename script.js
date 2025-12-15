// script.js - COMPLETE UPDATED VERSION
document.addEventListener("DOMContentLoaded", () => {
  console.log("SalesBuddy Application Initialized - Enhanced Version");

  // ========== LOCAL STORAGE MANAGER ==========
  class StorageManager {
    static save(key, data) {
      try {
        localStorage.setItem(`salesbuddy_${key}`, JSON.stringify(data));
        return true;
      } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
      }
    }
    
    static load(key, defaultValue = null) {
      try {
        const data = localStorage.getItem(`salesbuddy_${key}`);
        return data ? JSON.parse(data) : defaultValue;
      } catch (e) {
        console.error('Error loading from localStorage:', e);
        return defaultValue;
      }
    }
    
    static remove(key) {
      localStorage.removeItem(`salesbuddy_${key}`);
    }
    
    static clearAll() {
      const keys = [
        'leads', 'tasks', 'opportunities', 'proposals', 
        'customers', 'complaints', 'plannerEvents', 'notifications',
        'visits', 'onlineStatus'
      ];
      keys.forEach(key => this.remove(key));
    }
  }

  // ========== DATA MANAGER ==========
  class DataManager {
    static data = {
      leads: {},
      tasks: {},
      opportunities: {},
      proposals: {},
      customers: {},
      complaints: {},
      plannerEvents: [],
      notifications: [],
      insights: [],
      visits: {},
      onlineStatus: true
    };
    
    static init() {
      // Load data from localStorage or use default mock data
      this.data.leads = StorageManager.load('leads', this.getDefaultLeads());
      this.data.tasks = StorageManager.load('tasks', this.getDefaultTasks());
      this.data.opportunities = StorageManager.load('opportunities', this.getDefaultOpportunities());
      this.data.proposals = StorageManager.load('proposals', this.getDefaultProposals());
      this.data.customers = StorageManager.load('customers', this.getDefaultCustomers());
      this.data.complaints = StorageManager.load('complaints', this.getDefaultComplaints());
      this.data.plannerEvents = StorageManager.load('plannerEvents', this.getDefaultPlannerEvents());
      this.data.notifications = StorageManager.load('notifications', this.getDefaultNotifications());
      this.data.insights = StorageManager.load('insights', this.getDefaultInsights());
      this.data.visits = StorageManager.load('visits', this.getDefaultVisits());
      this.data.onlineStatus = StorageManager.load('onlineStatus', true);
      
      console.log('DataManager initialized');
    }
    
    static saveAll() {
      Object.keys(this.data).forEach(key => {
        StorageManager.save(key, this.data[key]);
      });
      console.log('All data saved to localStorage');
    }
    
    static generateId(dataObject) {
      const keys = Object.keys(dataObject);
      if (keys.length === 0) return '1';
      const maxId = Math.max(...keys.map(id => parseInt(id) || 0));
      return (maxId + 1).toString();
    }
    
    // Default data generators
    static getDefaultLeads() {
      return {
        '1': {
          name: 'John Smith',
          company: 'Tech Innovations Inc',
          status: 'Hot',
          value: '₹5.2L',
          region: 'North India',
          industry: 'Technology',
          assignedTo: 'Rahul Kumar',
          lastContact: '2024-03-15',
          tags: ['Enterprise', 'Q1 Priority', 'Decision Maker'],
          initials: 'JS',
          email: 'john@techinnovations.com',
          phone: '+91 98765 43210',
          source: 'website',
          notes: 'Interested in enterprise solution'
        },
        '2': {
          name: 'Sarah Johnson',
          company: 'Digital Solutions',
          status: 'Warm',
          value: '₹3.8L',
          region: 'West India',
          industry: 'Digital Services',
          assignedTo: 'Priya Sharma',
          lastContact: '2024-03-14',
          tags: ['SMB', 'Marketing'],
          initials: 'SJ',
          email: 'sarah@digitalsolutions.com',
          phone: '+91 98765 43211',
          source: 'referral',
          notes: 'Looking for marketing automation'
        }
      };
    }
    
    static getDefaultTasks() {
      return {
        '1': {
          title: 'Follow up with ABC Corp',
          description: 'Call John Smith to discuss the enterprise license proposal.',
          priority: 'High',
          time: '10:00 AM',
          assignedTo: 'Rahul Kumar',
          dueDate: '2024-03-18',
          relatedLead: 'John Smith - Tech Innovations',
          completed: false,
          category: 'followup'
        },
        '2': {
          title: 'Prepare proposal for XYZ Ltd',
          description: 'Create comprehensive proposal including pricing, timeline, and implementation plan.',
          priority: 'Medium',
          time: '11:30 AM',
          assignedTo: 'Priya Sharma',
          dueDate: '2024-03-19',
          relatedLead: 'Sarah Johnson - Digital Solutions',
          completed: false,
          category: 'proposal'
        }
      };
    }
    
    static getDefaultOpportunities() {
      return {
        '1': {
          title: 'Enterprise Software License',
          company: 'ABC Corporation',
          stage: 'Negotiation',
          value: '₹12.5L',
          probability: 80,
          expectedClose: '2024-04-15',
          owner: 'Rahul Kumar',
          description: 'Full enterprise license for 500 users including premium support and training.'
        }
      };
    }
    
    static getDefaultProposals() {
      return {
        '1': {
          title: 'Q1 Marketing Campaign',
          company: 'Brand Masters',
          status: 'pending',
          value: '₹9.5L',
          validUntil: '2024-04-01',
          owner: 'Rahul Kumar',
          description: 'Comprehensive digital marketing campaign for Q1 2024.'
        }
      };
    }
    
    static getDefaultCustomers() {
      return {
        '1': {
          name: 'Acme Corporation',
          contact: 'James Wilson',
          email: 'james@acme.com',
          phone: '+91 98765 43210',
          location: 'Mumbai',
          value: '₹45.2L',
          initials: 'AC',
          since: 'Jan 2022',
          status: 'active',
          industry: 'Technology'
        }
      };
    }
    
    static getDefaultComplaints() {
      return {
        '1': {
          title: 'Software Login Issues',
          customer: 'Acme Corporation',
          type: 'Technical',
          priority: 'high',
          status: 'investigating',
          createdAt: '2024-03-15',
          assignedTo: 'Tech Support',
          description: 'Multiple users unable to access the system.',
          contactPerson: 'John Manager',
          contactEmail: 'john@acme.com',
          contactPhone: '+91 98765 43210'
        }
      };
    }
    
    static getDefaultPlannerEvents() {
      return [
        {
          id: '1',
          title: "Discovery Call with ABC Corp",
          type: "call",
          time: "09:00 AM",
          date: new Date().toISOString().split('T')[0],
          duration: "30 min",
          attendees: ["John Smith"],
          description: "Initial discovery call"
        }
      ];
    }
    
    static getDefaultNotifications() {
      return [
        {
          id: '1',
          type: 'task',
          title: 'Task Due Soon',
          description: 'Follow up with ABC Corp is due in 1 hour',
          time: '5 min ago',
          relatedId: '1',
          screen: 'taskDetail'
        },
        {
          id: '2',
          type: 'lead',
          title: 'New Lead Assigned',
          description: 'John Smith from Tech Innovations',
          time: '30 min ago',
          relatedId: '1',
          screen: 'leadDetail'
        }
      ];
    }
    
    static getDefaultInsights() {
      return [
        {
          id: 1,
          type: "opportunity",
          title: "Upsell Opportunity Detected",
          description: "ABC Corp's usage has increased 40%. Consider proposing premium tier upgrade.",
          impact: "high"
        }
      ];
    }
    
    static getDefaultVisits() {
      return {
        '1': {
          id: '1',
          customerId: '1',
          customerName: 'Acme Corporation',
          visitDate: new Date().toISOString().split('T')[0],
          visitTime: '10:00 AM',
          purpose: 'Product Demo',
          location: 'Client Office, Mumbai',
          attendees: ['James Wilson', 'Rahul Kumar'],
          notes: 'Showed new product features. Client showed interest in premium plan.',
          followUpAction: 'Send pricing details',
          followUpDate: '2024-03-20',
          status: 'completed',
          visitDuration: '2 hours',
          travelCost: '₹1500',
          outcome: 'Positive',
          contactPerson: 'James Wilson'
        },
        '2': {
          id: '2',
          customerId: '1',
          customerName: 'Acme Corporation',
          visitDate: '2024-03-10',
          visitTime: '02:00 PM',
          purpose: 'Quarterly Review',
          location: 'Client Office, Mumbai',
          attendees: ['James Wilson', 'Priya Sharma'],
          notes: 'Discussed quarterly performance and future requirements.',
          followUpAction: 'Prepare Q2 proposal',
          followUpDate: '2024-03-25',
          status: 'completed',
          visitDuration: '1.5 hours',
          travelCost: '₹1200',
          outcome: 'Productive',
          contactPerson: 'James Wilson'
        }
      };
    }
  }

  // ========== STATUS MANAGER ==========
  class StatusManager {
    static init() {
      this.loadStatus();
      this.setupEventListeners();
    }
    
    static loadStatus() {
      const statusIcon = document.getElementById('statusIcon');
      const statusDot = statusIcon?.querySelector('.status-dot');
      
      if (statusIcon && statusDot) {
        const isOnline = DataManager.data.onlineStatus;
        
        if (isOnline) {
          statusDot.className = 'status-dot online';
          statusIcon.title = 'Online';
        } else {
          statusDot.className = 'status-dot offline';
          statusIcon.title = 'Offline';
        }
      }
    }
    
    static toggleStatus() {
      DataManager.data.onlineStatus = !DataManager.data.onlineStatus;
      DataManager.saveAll();
      this.loadStatus();
      
      const status = DataManager.data.onlineStatus ? 'Online' : 'Offline';
      UIHelper.showToast(`Status changed to ${status}`, 'info');
    }
    
    static setupEventListeners() {
      const statusIcon = document.getElementById('statusIcon');
      if (statusIcon) {
        statusIcon.addEventListener('click', () => this.toggleStatus());
      }
    }
  }

  // ========== SCREEN MANAGER ==========
  class ScreenManager {
    static screens = {};
    static currentScreen = 'dashboard';
    static screenHistory = [];
    
    static init() {
      // Collect all screen elements
      this.screens = {
        dashboard: document.getElementById('dashboardView'),
        sales: document.getElementById('salesScreen'),
        leads: document.getElementById('leadsScreen'),
        tasks: document.getElementById('tasksScreen'),
        leadDetail: document.getElementById('leadDetailScreen'),
        taskDetail: document.getElementById('taskDetailScreen'),
        leadForm: document.getElementById('leadFormScreen'),
        ideas: document.getElementById('ideasScreen'),
        planner: document.getElementById('plannerScreen'),
        opportunities: document.getElementById('opportunitiesScreen'),
        opportunityDetail: document.getElementById('opportunityDetailScreen'),
        proposals: document.getElementById('proposalsScreen'),
        proposalDetail: document.getElementById('proposalDetailScreen'),
        customers: document.getElementById('customersScreen'),
        customerDetail: document.getElementById('customerDetailScreen'),
        complaints: document.getElementById('complaintsScreen'),
        complaintDetail: document.getElementById('complaintDetailScreen'),
        taskForm: document.getElementById('taskFormScreen'),
        customerForm: document.getElementById('customerFormScreen'),
        complaintForm: document.getElementById('complaintFormScreen'),
        editLead: document.getElementById('editLeadScreen'),
        // Visit screens
        visits: document.getElementById('visitsScreen'),
        visitDetail: document.getElementById('visitDetailScreen'),
        visitForm: document.getElementById('visitFormScreen'),
        editVisit: document.getElementById('editVisitScreen')
      };
      
      // Setup back buttons
      this.setupBackButtons();
      // Setup navigation
      this.setupNavigation();
    }
    
    static show(screenId) {
      if (!this.screens[screenId]) {
        console.error(`Screen ${screenId} not found`);
        return;
      }
      
      // Hide all screens
      Object.values(this.screens).forEach(screen => {
        if (screen) {
          screen.classList.remove('active');
          screen.classList.add('hidden');
        }
      });
      
      // Show selected screen
      const screen = this.screens[screenId];
      screen.classList.remove('hidden');
      setTimeout(() => {
        screen.classList.add('active');
        screen.scrollTop = 0;
      }, 10);
      
      // Update history
      this.screenHistory.push(screenId);
      this.currentScreen = screenId;
      
      // Update bottom navigation
      this.updateBottomNav(screenId);
      
      // Load screen-specific data
      this.loadScreenData(screenId);
    }
    
    static loadScreenData(screenId) {
      switch(screenId) {
        case 'tasks':
          TaskManager.loadTasks();
          break;
        case 'leads':
          LeadManager.loadLeads();
          break;
        case 'sales':
          SalesManager.loadSalesData();
          break;
        case 'planner':
          PlannerManager.loadPlannerEvents();
          break;
        case 'ideas':
          loadInsights();
          break;
        case 'opportunities':
          loadOpportunities();
          break;
        case 'proposals':
          loadProposals();
          break;
        case 'customers':
          loadCustomers();
          break;
        case 'complaints':
          loadComplaints();
          break;
        case 'visits':
          VisitManager.loadVisits();
          break;
        case 'taskForm':
        case 'customerForm':
        case 'complaintForm':
        case 'visitForm':
        case 'editVisit':
          FormManager.populateDropdowns();
          break;
      }
    }
    
    static goBack() {
      if (this.screenHistory.length > 1) {
        this.screenHistory.pop(); // Remove current
        const prevScreen = this.screenHistory.pop();
        if (prevScreen && this.screens[prevScreen]) {
          this.show(prevScreen);
        } else {
          this.show('dashboard');
        }
      } else {
        this.show('dashboard');
      }
    }
    
    static setupBackButtons() {
      // Add click handlers to all back buttons
      document.querySelectorAll('.back').forEach(btn => {
        btn.addEventListener('click', () => this.goBack());
      });
      
      // Add specific back button handlers for new screens
      document.getElementById('backFromVisits')?.addEventListener('click', () => this.goBack());
      document.getElementById('backFromVisitDetail')?.addEventListener('click', () => this.goBack());
      document.getElementById('backFromVisitForm')?.addEventListener('click', () => this.goBack());
      document.getElementById('backFromEditVisit')?.addEventListener('click', () => this.goBack());
    }
    
    static setupNavigation() {
      // Bottom navigation
      document.getElementById('navHome')?.addEventListener('click', () => this.show('dashboard'));
      document.getElementById('navPlanner')?.addEventListener('click', () => this.show('planner'));
      document.getElementById('navIdeas')?.addEventListener('click', () => this.show('ideas'));
      document.getElementById('navSettings')?.addEventListener('click', () => {
        UIHelper.showToast('Settings screen coming soon!');
      });
      
      // Nav FAB button
      document.getElementById('navFab')?.addEventListener('click', () => {
        QuickActionManager.toggleMenu();
      });
      
      // Dashboard navigation
      document.getElementById('viewInsightsBtn')?.addEventListener('click', () => this.show('ideas'));
      
      // Form cancel buttons
      document.getElementById('cancelLeadForm')?.addEventListener('click', () => this.show('leads'));
      document.getElementById('cancelTaskForm')?.addEventListener('click', () => this.show('tasks'));
      document.getElementById('cancelCustomerForm')?.addEventListener('click', () => this.show('customers'));
      document.getElementById('cancelComplaintForm')?.addEventListener('click', () => this.show('complaints'));
      document.getElementById('cancelEditLead')?.addEventListener('click', () => this.goBack());
      document.getElementById('cancelVisitForm')?.addEventListener('click', () => this.show('visits'));
      document.getElementById('cancelEditVisit')?.addEventListener('click', () => this.goBack());
      
      // Create buttons
      document.getElementById('createOpportunityBtn')?.addEventListener('click', () => {
        UIHelper.showToast('Create opportunity feature coming soon!');
      });
      document.getElementById('createProposalBtn')?.addEventListener('click', () => {
        UIHelper.showToast('Create proposal feature coming soon!');
      });
      document.getElementById('createCustomerBtn')?.addEventListener('click', () => this.show('customerForm'));
      document.getElementById('createComplaintBtn')?.addEventListener('click', () => this.show('complaintForm'));
      document.getElementById('createVisitBtn')?.addEventListener('click', () => this.show('visitForm'));
      document.getElementById('createVisitHeaderBtn')?.addEventListener('click', () => this.show('visitForm'));
      
      // Edit buttons
      document.getElementById('editLeadBtn')?.addEventListener('click', () => {
        const leadId = document.getElementById('leadDetailScreen').querySelector('[data-lead-id]')?.dataset.leadId;
        if (leadId) LeadManager.editLead(leadId);
      });
      
      document.getElementById('editTaskBtn')?.addEventListener('click', () => {
        UIHelper.showToast('Edit task feature coming soon!');
      });
      
      document.getElementById('editVisitBtn')?.addEventListener('click', () => {
        const visitScreen = document.getElementById('visitDetailScreen');
        const visitId = visitScreen?.dataset.visitId;
        if (visitId) VisitManager.editVisit(visitId);
      });
      
      // Dashboard card clicks
      this.setupDashboardCards();
    }
    
    static setupDashboardCards() {
      const cards = {
        salesTargetCard: 'sales',
        tasksCard: 'tasks',
        leadsCard: 'leads',
        opportunitiesCard: 'opportunities',
        proposalsCard: 'proposals',
        customersCard: 'customers',
        complaintsCard: 'complaints',
        visitsCard: 'visits' // Activate visits card
      };
      
      Object.entries(cards).forEach(([cardId, screenId]) => {
        const card = document.getElementById(cardId);
        if (card) {
          card.addEventListener('click', () => this.show(screenId));
        }
      });
    }
    
    static updateBottomNav(screenId) {
      // Reset all nav items
      document.querySelectorAll('.nav-item:not(.fab-nav-item)').forEach(item => {
        item.classList.remove('active');
      });
      
      // Set active based on screen
      switch(screenId) {
        case 'dashboard':
          document.getElementById('navHome')?.classList.add('active');
          break;
        case 'planner':
          document.getElementById('navPlanner')?.classList.add('active');
          break;
        case 'ideas':
          document.getElementById('navIdeas')?.classList.add('active');
          break;
      }
    }
  }

  // ========== NOTIFICATION MANAGER ==========
  class NotificationManager {
    static init() {
      this.loadNotifications();
      this.setupEventListeners();
    }
    
    static loadNotifications() {
      const dropdown = document.getElementById('notificationDropdown');
      const countElement = document.getElementById('notificationCount');
      
      if (!dropdown) return;
      
      dropdown.innerHTML = '';
      
      DataManager.data.notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification-item unread';
        notificationElement.dataset.notificationId = notification.id;
        notificationElement.dataset.relatedId = notification.relatedId;
        notificationElement.dataset.screen = notification.screen;
        
        notificationElement.innerHTML = `
          <div class="notification-icon">
            ${this.getNotificationIcon(notification.type)}
          </div>
          <div>
            <p class="notification-title">${notification.title}</p>
            <p class="notification-desc">${notification.description}</p>
            <p class="notification-time">${notification.time}</p>
          </div>
          <button class="notification-dismiss" data-notification-id="${notification.id}">×</button>
        `;
        
        dropdown.appendChild(notificationElement);
      });
      
      // Add View All button
      const viewAllBtn = document.createElement('button');
      viewAllBtn.className = 'view-all-btn';
      viewAllBtn.textContent = 'View All Notifications';
      viewAllBtn.addEventListener('click', () => {
        UIHelper.showToast('All notifications view coming soon!');
        document.getElementById('notificationDropdown').classList.add('hidden');
      });
      dropdown.appendChild(viewAllBtn);
      
      // Update notification count
      if (countElement) {
        countElement.textContent = DataManager.data.notifications.length;
      }
    }
    
    static getNotificationIcon(type) {
      const icons = {
        'task': '⏰',
        'lead': '👤',
        'opportunity': '💰',
        'complaint': '⚠',
        'visit': '📍'
      };
      return icons[type] || '🔔';
    }
    
    static dismissNotification(notificationId) {
      DataManager.data.notifications = DataManager.data.notifications.filter(
        n => n.id !== notificationId
      );
      DataManager.saveAll();
      this.loadNotifications();
      UIHelper.showToast('Notification dismissed');
    }
    
    static setupEventListeners() {
      // Notification dropdown toggle
      document.getElementById('notificationBtn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('notificationDropdown').classList.toggle('hidden');
      });
      
      // Dismiss notifications
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('notification-dismiss')) {
          const notificationId = e.target.dataset.notificationId;
          this.dismissNotification(notificationId);
          e.stopPropagation();
        }
        
        // Click notification to navigate
        if (e.target.closest('.notification-item')) {
          const item = e.target.closest('.notification-item');
          const screen = item.dataset.screen;
          const relatedId = item.dataset.relatedId;
          
          if (screen && relatedId) {
            this.handleNotificationClick(screen, relatedId);
          }
          
          document.getElementById('notificationDropdown').classList.add('hidden');
        }
        
        // Close dropdown when clicking outside
        if (!e.target.closest('.notification') && !e.target.closest('.notification-dropdown')) {
          document.getElementById('notificationDropdown').classList.add('hidden');
        }
      });
    }
    
    static handleNotificationClick(screen, relatedId) {
      // Load the related item detail based on screen type
      switch(screen) {
        case 'taskDetail':
          loadTaskDetail(relatedId);
          break;
        case 'leadDetail':
          loadLeadDetail(relatedId);
          break;
        case 'opportunityDetail':
          loadOpportunityDetail(relatedId);
          break;
        case 'complaintDetail':
          loadComplaintDetail(relatedId);
          break;
        case 'visitDetail':
          loadVisitDetail(relatedId);
          break;
      }
      ScreenManager.show(screen);
    }
  }

  // ========== TASK MANAGER ==========
  class TaskManager {
    static selectedTaskIds = new Set();
    
    static init() {
      this.setupEventListeners();
    }
    
    static loadTasks() {
      const container = document.getElementById('tasksListContainer');
      if (!container) return;
      
      container.innerHTML = '';
      
      const dateFilter = document.getElementById('tasksDateFilter')?.value || 'all';
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      Object.entries(DataManager.data.tasks).forEach(([id, task]) => {
        // Skip completed tasks
        if (task.completed) return;
        
        const taskDate = new Date(task.dueDate);
        
        // Apply date filter
        if (dateFilter !== 'all') {
          const diffDays = Math.floor((taskDate - today) / (1000 * 60 * 60 * 24));
          
          if (dateFilter === 'today' && diffDays !== 0) return;
          if (dateFilter === 'tomorrow' && diffDays !== 1) return;
          if (dateFilter === 'overdue' && diffDays < 0) return;
          if (dateFilter === 'week' && (diffDays < 0 || diffDays > 6)) return;
          if (dateFilter === 'future' && diffDays <= 0) return;
        }
        
        const taskElement = this.createTaskElement(id, task);
        container.appendChild(taskElement);
      });
      
      this.updateTaskCounts();
    }
    
    static createTaskElement(id, task) {
      const element = document.createElement('div');
      element.className = 'task-item';
      element.dataset.taskId = id;
      element.dataset.priority = task.priority.toLowerCase();
      element.dataset.date = task.dueDate;
      
      element.innerHTML = `
        <label class="task-checkbox multi-select">
          <input type="checkbox" class="task-select-checkbox" data-task-id="${id}">
          <span class="checkmark"></span>
        </label>
        <div class="task-info">
          <div class="task-header">
            <h4>${task.title}</h4>
            <span class="task-badge ${task.priority.toLowerCase()}">${task.priority}</span>
          </div>
          <p class="task-time">⏰ ${task.time} • Due ${task.dueDate}</p>
          <button class="expand-task-btn" data-task-id="${id}">
            <i class="fas fa-chevron-down"></i> Details
          </button>
        </div>
        <div class="task-expandable" id="task-details-${id}">
          <div class="task-detail-row">
            <span class="task-detail-label">Description:</span>
            <span class="task-detail-value">${task.description}</span>
          </div>
          <div class="task-detail-row">
            <span class="task-detail-label">Assigned To:</span>
            <span class="task-detail-value">${task.assignedTo}</span>
          </div>
          <div class="task-detail-row">
            <span class="task-detail-label">Category:</span>
            <span class="task-detail-value">${task.category || 'General'}</span>
          </div>
          <div class="task-detail-row">
            <span class="task-detail-label">Related Lead:</span>
            <span class="task-detail-value">${task.relatedLead}</span>
          </div>
          <button class="action-btn" data-task-id="${id}">
            <i class="fas fa-external-link-alt"></i> View Full Details
          </button>
        </div>
      `;
      
      return element;
    }
    
    static updateTaskCounts() {
      const taskCount = Object.values(DataManager.data.tasks).filter(t => !t.completed).length;
      const badgeElement = document.getElementById('taskBadgeCount');
      const countTextElement = document.getElementById('tasksCountText');
      
      if (badgeElement) badgeElement.textContent = taskCount;
      if (countTextElement) {
        const today = new Date().toISOString().split('T')[0];
        const todayCount = Object.values(DataManager.data.tasks).filter(task => 
          task.dueDate === today && !task.completed
        ).length;
        countTextElement.textContent = `${todayCount} due today • ${taskCount} total`;
      }
    }
    
    static setupEventListeners() {
      // Task multi-select
      document.addEventListener('change', (e) => {
        if (e.target.classList.contains('task-select-checkbox')) {
          const taskId = e.target.dataset.taskId;
          const taskItem = e.target.closest('.task-item');
          
          if (e.target.checked) {
            this.selectedTaskIds.add(taskId);
            taskItem.classList.add('selected');
          } else {
            this.selectedTaskIds.delete(taskId);
            taskItem.classList.remove('selected');
          }
          
          this.updateMultiSelectUI();
        }
      });
      
      // Expand task details
      document.addEventListener('click', (e) => {
        if (e.target.closest('.expand-task-btn')) {
          const taskId = e.target.closest('.expand-task-btn').dataset.taskId;
          this.toggleTaskDetails(taskId, e.target.closest('.expand-task-btn'));
        }
        
        // View full details
        if (e.target.closest('.action-btn[data-task-id]')) {
          const taskId = e.target.closest('.action-btn').dataset.taskId;
          this.viewTaskDetail(taskId);
        }
      });
      
      // Multi-select actions
      document.getElementById('markCompleteSelected')?.addEventListener('click', () => {
        this.selectedTaskIds.forEach(taskId => {
          const task = DataManager.data.tasks[taskId];
          if (task) task.completed = true;
        });
        DataManager.saveAll();
        this.selectedTaskIds.clear();
        this.loadTasks();
        this.updateMultiSelectUI();
        UIHelper.showToast('Tasks marked as complete', 'success');
      });
      
      document.getElementById('deleteSelectedTasks')?.addEventListener('click', () => {
        if (this.selectedTaskIds.size === 0) return;
        
        if (confirm(`Delete ${this.selectedTaskIds.size} selected tasks?`)) {
          this.selectedTaskIds.forEach(taskId => {
            delete DataManager.data.tasks[taskId];
          });
          DataManager.saveAll();
          this.selectedTaskIds.clear();
          this.loadTasks();
          this.updateMultiSelectUI();
          UIHelper.showToast('Tasks deleted', 'success');
        }
      });
      
      document.getElementById('cancelMultiSelect')?.addEventListener('click', () => {
        this.selectedTaskIds.clear();
        document.querySelectorAll('.task-select-checkbox').forEach(cb => {
          cb.checked = false;
          cb.closest('.task-item')?.classList.remove('selected');
        });
        this.updateMultiSelectUI();
      });
      
      // Date filter
      document.getElementById('tasksDateFilter')?.addEventListener('change', () => this.loadTasks());
      
      // Bulk actions button
      document.getElementById('bulkTaskActions')?.addEventListener('click', () => {
        UIHelper.showToast('Bulk actions coming soon!');
      });
    }
    
    static toggleTaskDetails(taskId, button) {
      const details = document.getElementById(`task-details-${taskId}`);
      if (!details) return;
      
      details.classList.toggle('active');
      if (button) {
        const icon = button.querySelector('i');
        if (details.classList.contains('active')) {
          icon.className = 'fas fa-chevron-up';
          button.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
        } else {
          icon.className = 'fas fa-chevron-down';
          button.innerHTML = '<i class="fas fa-chevron-down"></i> Details';
        }
      }
    }
    
    static viewTaskDetail(taskId) {
      loadTaskDetail(taskId);
      ScreenManager.show('taskDetail');
    }
    
    static updateMultiSelectUI() {
      const actionsPanel = document.getElementById('taskMultiSelectActions');
      if (!actionsPanel) return;
      
      if (this.selectedTaskIds.size > 0) {
        actionsPanel.classList.remove('hidden');
      } else {
        actionsPanel.classList.add('hidden');
      }
    }
  }

  // ========== LEAD MANAGER ==========
  class LeadManager {
    static init() {
      this.setupEventListeners();
    }
    
    static loadLeads() {
      const container = document.getElementById('leadsListContainer');
      if (!container) return;
      
      container.innerHTML = '';
      
      const filterValue = document.getElementById('leadsAdvancedFilter')?.value || 'all';
      const searchValue = document.getElementById('leadsSearch')?.value.toLowerCase() || '';
      
      Object.entries(DataManager.data.leads).forEach(([id, lead]) => {
        // Apply search
        if (searchValue && !lead.name.toLowerCase().includes(searchValue) && 
            !lead.company.toLowerCase().includes(searchValue)) {
          return;
        }
        
        // Apply advanced filter
        if (filterValue !== 'all') {
          if (filterValue === 'hot' && lead.status.toLowerCase() !== 'hot') return;
          if (filterValue === 'warm' && lead.status.toLowerCase() !== 'warm') return;
          if (filterValue === 'cold' && lead.status.toLowerCase() !== 'cold') return;
        }
        
        const leadElement = this.createLeadElement(id, lead);
        container.appendChild(leadElement);
      });
      
      this.updateLeadCounts();
    }
    
    static createLeadElement(id, lead) {
      const element = document.createElement('div');
      element.className = 'lead-card';
      element.dataset.status = lead.status.toLowerCase();
      element.dataset.leadId = id;
      
      element.innerHTML = `
        <div class="lead-avatar">${lead.initials}</div>
        <div class="lead-info">
          <div class="lead-header">
            <h4>${lead.name}</h4>
            <span class="lead-badge ${lead.status.toLowerCase()}">${lead.status}</span>
          </div>
          <p class="lead-company">${lead.company}</p>
          <p class="lead-detail">${lead.region} • ${lead.industry}</p>
          <div class="lead-actions">
            <button class="icon-btn edit-lead-btn" data-lead-id="${id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="icon-btn"><i class="fas fa-phone"></i></button>
            <button class="icon-btn"><i class="fas fa-envelope"></i></button>
          </div>
        </div>
      `;
      
      return element;
    }
    
    static updateLeadCounts() {
      const leadCount = Object.keys(DataManager.data.leads).length;
      const badgeElement = document.getElementById('leadBadgeCount');
      const countTextElement = document.getElementById('leadsCountText');
      
      if (badgeElement) badgeElement.textContent = leadCount;
      if (countTextElement) countTextElement.textContent = `${leadCount} total leads`;
    }
    
    static setupEventListeners() {
      // Lead click to view detail
      document.addEventListener('click', (e) => {
        const leadCard = e.target.closest('.lead-card');
        if (leadCard && !e.target.closest('.icon-btn')) {
          const leadId = leadCard.dataset.leadId;
          loadLeadDetail(leadId);
          ScreenManager.show('leadDetail');
        }
        
        // Edit lead button
        if (e.target.closest('.edit-lead-btn')) {
          const leadId = e.target.closest('.edit-lead-btn').dataset.leadId;
          this.editLead(leadId);
        }
      });
      
      // Filters and search
      document.getElementById('leadsAdvancedFilter')?.addEventListener('change', () => this.loadLeads());
      document.getElementById('leadsSearch')?.addEventListener('input', () => this.loadLeads());
      
      // Filter buttons
      document.getElementById('leadsFilterBtn')?.addEventListener('click', () => {
        const panel = document.getElementById('leadsFilterPanel');
        if (panel) panel.classList.toggle('hidden');
      });
      
      document.getElementById('clearLeadsFilters')?.addEventListener('click', () => {
        document.getElementById('leadsAdvancedFilter').value = 'all';
        document.getElementById('leadsSearch').value = '';
        this.loadLeads();
        document.getElementById('leadsFilterPanel').classList.add('hidden');
      });
    }
    
    static editLead(leadId) {
      const lead = DataManager.data.leads[leadId];
      if (!lead) return;
      
      // Populate edit form
      document.getElementById('editLeadId').value = leadId;
      document.getElementById('editLeadName').value = lead.name;
      document.getElementById('editLeadCompany').value = lead.company;
      document.getElementById('editLeadStatus').value = lead.status.toLowerCase();
      document.getElementById('editLeadEmail').value = lead.email || '';
      document.getElementById('editLeadPhone').value = lead.phone || '';
      
      // Extract numeric value
      const numericValue = lead.value.replace('₹', '').replace('L', '');
      document.getElementById('editLeadValue').value = parseFloat(numericValue) * 100000 || '';
      
      document.getElementById('editLeadSource').value = lead.source || 'website';
      document.getElementById('editLeadRegion').value = lead.region.toLowerCase() || 'north';
      document.getElementById('editLeadNotes').value = lead.notes || '';
      document.getElementById('editLeadTags').value = lead.tags ? lead.tags.join(', ') : '';
      
      ScreenManager.show('editLead');
    }
  }

  // ========== VISIT MANAGER ==========
  class VisitManager {
    static init() {
      this.setupEventListeners();
    }
    
    static loadVisits() {
      const container = document.getElementById('visitsListContainer');
      if (!container) return;
      
      container.innerHTML = '';
      
      const searchValue = document.getElementById('visitsSearch')?.value.toLowerCase() || '';
      const filterValue = document.getElementById('visitsFilter')?.value || 'all';
      
      const visits = Object.entries(DataManager.data.visits);
      
      if (visits.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-calendar-check"></i>
            <h4>No visits recorded</h4>
            <p>Schedule your first customer visit</p>
            <button class="btn btn-primary" id="addFirstVisitBtn">
              <i class="fas fa-plus"></i> Add Visit
            </button>
          </div>
        `;
        
        document.getElementById('addFirstVisitBtn')?.addEventListener('click', () => {
          ScreenManager.show('visitForm');
        });
        
        return;
      }
      
      visits.forEach(([id, visit]) => {
        // Apply search filter
        if (searchValue && 
            !visit.customerName.toLowerCase().includes(searchValue) &&
            !visit.purpose.toLowerCase().includes(searchValue) &&
            !visit.location.toLowerCase().includes(searchValue)) {
          return;
        }
        
        // Apply status filter
        if (filterValue !== 'all' && visit.status !== filterValue) {
          return;
        }
        
        const visitElement = this.createVisitElement(id, visit);
        container.appendChild(visitElement);
      });
      
      // Update visits count
      this.updateVisitCounts();
    }
    
    static createVisitElement(id, visit) {
      const element = document.createElement('div');
      element.className = 'visit-card';
      element.dataset.visitId = id;
      element.dataset.status = visit.status;
      
      const statusClass = visit.status === 'completed' ? 'completed' : 
                         visit.status === 'scheduled' ? 'scheduled' : 'cancelled';
      
      element.innerHTML = `
        <div class="visit-icon">
          <div class="icon-box ${statusClass}">📍</div>
        </div>
        <div class="visit-info">
          <div class="visit-header">
            <h4 class="visit-title">${visit.purpose}</h4>
            <span class="visit-badge ${statusClass}">${visit.status}</span>
          </div>
          <p class="visit-customer">${visit.customerName}</p>
          <div class="visit-details">
            <span class="visit-date">📅 ${visit.visitDate} at ${visit.visitTime}</span>
            <span class="visit-location">📍 ${visit.location}</span>
          </div>
          <div class="visit-outcome">
            <strong>Outcome:</strong> ${visit.outcome || 'Not specified'}
          </div>
        </div>
      `;
      
      element.addEventListener('click', () => {
        this.viewVisitDetail(id);
      });
      
      return element;
    }
    
    static updateVisitCounts() {
      const visits = Object.values(DataManager.data.visits);
      const totalVisits = visits.length;
      const thisMonth = new Date().getMonth();
      const thisYear = new Date().getFullYear();
      
      const thisMonthVisits = visits.filter(visit => {
        const visitDate = new Date(visit.visitDate);
        return visitDate.getMonth() === thisMonth && visitDate.getFullYear() === thisYear;
      }).length;
      
      // Update dashboard badge
      const badgeElement = document.getElementById('visitBadgeCount');
      if (badgeElement) {
        badgeElement.textContent = thisMonthVisits;
      }
      
      // Update visits screen count
      const countTextElement = document.getElementById('visitsCountText');
      if (countTextElement) {
        countTextElement.textContent = `${thisMonthVisits} visits this month • ${totalVisits} total`;
      }
    }
    
    static setupEventListeners() {
      // Search and filter
      document.getElementById('visitsSearch')?.addEventListener('input', () => this.loadVisits());
      document.getElementById('visitsFilter')?.addEventListener('change', () => this.loadVisits());
      
      // Filter button
      document.getElementById('visitsFilterBtn')?.addEventListener('click', () => {
        const panel = document.getElementById('visitsFilterPanel');
        if (panel) panel.classList.toggle('hidden');
      });
      
      document.getElementById('clearVisitsFilters')?.addEventListener('click', () => {
        document.getElementById('visitsFilter').value = 'all';
        document.getElementById('visitsSearch').value = '';
        this.loadVisits();
        document.getElementById('visitsFilterPanel').classList.add('hidden');
      });
    }
    
    static viewVisitDetail(visitId) {
      loadVisitDetail(visitId);
      ScreenManager.show('visitDetail');
    }
    
    static editVisit(visitId) {
      const visit = DataManager.data.visits[visitId];
      if (!visit) return;
      
      // Populate edit form
      document.getElementById('editVisitId').value = visitId;
      document.getElementById('editVisitCustomer').value = visit.customerId || '';
      document.getElementById('editVisitDate').value = visit.visitDate;
      document.getElementById('editVisitTime').value = visit.visitTime;
      document.getElementById('editVisitPurpose').value = visit.purpose;
      document.getElementById('editVisitLocation').value = visit.location;
      document.getElementById('editVisitAttendees').value = visit.attendees ? visit.attendees.join(', ') : '';
      document.getElementById('editVisitNotes').value = visit.notes || '';
      document.getElementById('editVisitFollowUp').value = visit.followUpAction || '';
      document.getElementById('editVisitFollowUpDate').value = visit.followUpDate || '';
      document.getElementById('editVisitStatus').value = visit.status;
      document.getElementById('editVisitDuration').value = visit.visitDuration || '';
      document.getElementById('editVisitCost').value = visit.travelCost ? visit.travelCost.replace('₹', '') : '';
      document.getElementById('editVisitOutcome').value = visit.outcome || '';
      
      ScreenManager.show('editVisit');
    }
    
    static prepareVisitForm(customerId = '') {
      if (customerId) {
        const customer = DataManager.data.customers[customerId];
        if (customer) {
          document.getElementById('newVisitCustomer').value = customerId;
        }
      }
      
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('newVisitDate').value = today;
      document.getElementById('newVisitFollowUpDate').value = today;
      
      // Set default time
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      document.getElementById('newVisitTime').value = `${hours}:${minutes}`;
    }
  }

  // ========== FORM MANAGER ==========
  class FormManager {
    static init() {
      this.setupFormHandlers();
      this.setupDynamicFields();
    }
    
    static populateDropdowns() {
      // Populate customer dropdown for complaint form
      const customerSelect = document.getElementById('newComplaintCustomer');
      if (customerSelect) {
        customerSelect.innerHTML = '<option value="">Select Customer</option>';
        Object.entries(DataManager.data.customers).forEach(([id, customer]) => {
          const option = document.createElement('option');
          option.value = id;
          option.textContent = customer.name;
          customerSelect.appendChild(option);
        });
      }
      
      // Populate customer dropdown for visit forms
      const newVisitCustomer = document.getElementById('newVisitCustomer');
      const editVisitCustomer = document.getElementById('editVisitCustomer');
      
      [newVisitCustomer, editVisitCustomer].forEach(select => {
        if (select) {
          select.innerHTML = '<option value="">Select Customer</option>';
          Object.entries(DataManager.data.customers).forEach(([id, customer]) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = customer.name;
            select.appendChild(option);
          });
        }
      });
      
      // Set default dates
      const today = new Date().toISOString().split('T')[0];
      
      const taskDueDate = document.getElementById('newTaskDueDate');
      if (taskDueDate) {
        taskDueDate.value = today;
        taskDueDate.min = today;
      }
      
      const eventDate = document.getElementById('eventDate');
      if (eventDate) {
        eventDate.value = today;
        eventDate.min = today;
      }
      
      // Set dates for visit forms
      const newVisitDate = document.getElementById('newVisitDate');
      const editVisitDate = document.getElementById('editVisitDate');
      const newVisitFollowUpDate = document.getElementById('newVisitFollowUpDate');
      const editVisitFollowUpDate = document.getElementById('editVisitFollowUpDate');
      
      [newVisitDate, editVisitDate, newVisitFollowUpDate, editVisitFollowUpDate].forEach(input => {
        if (input) {
          input.value = today;
          input.min = today;
        }
      });
      
      // Set current time
      const eventStartTime = document.getElementById('eventStartTime');
      if (eventStartTime) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        eventStartTime.value = `${hours}:${minutes}`;
      }
      
      // Set current time for visit forms
      const newVisitTime = document.getElementById('newVisitTime');
      const editVisitTime = document.getElementById('editVisitTime');
      
      [newVisitTime, editVisitTime].forEach(input => {
        if (input) {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, '0');
          const minutes = now.getMinutes().toString().padStart(2, '0');
          input.value = `${hours}:${minutes}`;
        }
      });
    }
    
    static setupDynamicFields() {
      // Task related item selection
      document.getElementById('newTaskRelated')?.addEventListener('change', (e) => {
        const container = document.getElementById('relatedItemContainer');
        const select = document.getElementById('newTaskRelatedItem');
        
        if (e.target.value) {
          container.style.display = 'block';
          select.innerHTML = '<option value="">Select Item</option>';
          
          if (e.target.value === 'lead') {
            Object.entries(DataManager.data.leads).forEach(([id, lead]) => {
              const option = document.createElement('option');
              option.value = id;
              option.textContent = `${lead.name} - ${lead.company}`;
              select.appendChild(option);
            });
          } else if (e.target.value === 'customer') {
            Object.entries(DataManager.data.customers).forEach(([id, customer]) => {
              const option = document.createElement('option');
              option.value = id;
              option.textContent = customer.name;
              select.appendChild(option);
            });
          }
        } else {
          container.style.display = 'none';
        }
      });
      
      // Specific person field
      document.getElementById('newTaskAssignedTo')?.addEventListener('change', (e) => {
        const container = document.getElementById('specificPersonContainer');
        container.style.display = e.target.value === 'specific' ? 'block' : 'none';
      });
    }
    
    static setupFormHandlers() {
      // New Lead Form
      document.getElementById('newLeadForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewLeadForm();
      });
      
      // New Task Form
      document.getElementById('newTaskForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewTaskForm();
      });
      
      // New Customer Form
      document.getElementById('newCustomerForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewCustomerForm();
      });
      
      // New Complaint Form
      document.getElementById('newComplaintForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewComplaintForm();
      });
      
      // Edit Lead Form
      document.getElementById('editLeadForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditLeadForm();
      });
      
      // Add Event Form
      document.getElementById('addEventForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddEventForm();
      });
      
      // Visit Forms
      document.getElementById('newVisitForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewVisitForm();
      });
      
      document.getElementById('editVisitForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditVisitForm();
      });
    }
    
    static handleNewLeadForm() {
      const leadId = DataManager.generateId(DataManager.data.leads);
      const name = document.getElementById('newLeadName').value;
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
      const value = document.getElementById('newLeadValue').value;
      
      DataManager.data.leads[leadId] = {
        name: name,
        company: document.getElementById('newLeadCompany').value,
        status: document.getElementById('newLeadStatus').value,
        email: document.getElementById('newLeadEmail').value,
        phone: document.getElementById('newLeadPhone').value,
        value: value ? `₹${(parseInt(value)/100000).toFixed(1)}L` : '₹0',
        region: document.getElementById('newLeadRegion').value || 'Unknown',
        industry: 'Technology',
        assignedTo: 'Unassigned',
        lastContact: new Date().toISOString().split('T')[0],
        tags: document.getElementById('newLeadTags').value ? 
              document.getElementById('newLeadTags').value.split(',').map(t => t.trim()) : [],
        initials: initials || 'NA',
        source: document.getElementById('newLeadSource').value,
        notes: document.getElementById('newLeadNotes').value
      };
      
      DataManager.saveAll();
      UIHelper.showToast('Lead created successfully!', 'success');
      ScreenManager.show('leads');
      document.getElementById('newLeadForm').reset();
    }
    
    static handleNewTaskForm() {
      const taskId = DataManager.generateId(DataManager.data.tasks);
      const assignedTo = document.getElementById('newTaskAssignedTo').value;
      let assignedToValue = assignedTo;
      
      if (assignedTo === 'specific') {
        assignedToValue = document.getElementById('newTaskPersonName').value || 'Specific Person';
      }
      
      DataManager.data.tasks[taskId] = {
        title: document.getElementById('newTaskTitle').value,
        priority: document.getElementById('newTaskPriority').value,
        dueDate: document.getElementById('newTaskDueDate').value,
        time: document.getElementById('newTaskTime').value || '09:00 AM',
        description: document.getElementById('newTaskDescription').value || 'No description provided.',
        assignedTo: assignedToValue,
        category: document.getElementById('newTaskCategory').value,
        completed: false,
        relatedLead: ''
      };
      
      DataManager.saveAll();
      UIHelper.showToast('Task created successfully!', 'success');
      ScreenManager.show('tasks');
      document.getElementById('newTaskForm').reset();
    }
    
    static handleNewCustomerForm() {
      const customerId = DataManager.generateId(DataManager.data.customers);
      const company = document.getElementById('newCustomerCompany').value;
      const initials = company.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
      const value = document.getElementById('newCustomerValue').value;
      
      DataManager.data.customers[customerId] = {
        name: company,
        contact: document.getElementById('newCustomerContact').value,
        email: document.getElementById('newCustomerEmail').value,
        phone: document.getElementById('newCustomerPhone').value,
        industry: document.getElementById('newCustomerIndustry').value,
        location: document.getElementById('newCustomerLocation').value,
        since: document.getElementById('newCustomerSince').value || new Date().toISOString().split('T')[0],
        value: value ? `₹${(parseInt(value)/100000).toFixed(1)}L` : '₹0',
        initials: initials || 'NA',
        status: document.getElementById('newCustomerStatus').value,
        paymentTerms: document.getElementById('newCustomerPaymentTerms').value,
        notes: document.getElementById('newCustomerNotes').value
      };
      
      DataManager.saveAll();
      UIHelper.showToast('Customer added successfully!', 'success');
      ScreenManager.show('customers');
      document.getElementById('newCustomerForm').reset();
    }
    
    static handleNewComplaintForm() {
      const complaintId = DataManager.generateId(DataManager.data.complaints);
      const customerId = document.getElementById('newComplaintCustomer').value;
      const customer = DataManager.data.customers[customerId];
      
      DataManager.data.complaints[complaintId] = {
        title: document.getElementById('newComplaintTitle').value,
        customer: customer ? customer.name : 'Unknown Customer',
        type: document.getElementById('newComplaintType').value,
        priority: document.getElementById('newComplaintPriority').value,
        assignedTo: document.getElementById('newComplaintAssigned').value,
        description: document.getElementById('newComplaintDescription').value,
        contactPerson: document.getElementById('newComplaintContact').value,
        contactEmail: document.getElementById('newComplaintEmail').value,
        contactPhone: document.getElementById('newComplaintPhone').value,
        status: document.getElementById('newComplaintStatus').value,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      DataManager.saveAll();
      UIHelper.showToast('Complaint registered successfully!', 'success');
      ScreenManager.show('complaints');
      document.getElementById('newComplaintForm').reset();
    }
    
    static handleEditLeadForm() {
      const leadId = document.getElementById('editLeadId').value;
      const lead = DataManager.data.leads[leadId];
      
      if (!lead) {
        UIHelper.showToast('Lead not found', 'error');
        return;
      }
      
      lead.name = document.getElementById('editLeadName').value;
      lead.company = document.getElementById('editLeadCompany').value;
      lead.status = document.getElementById('editLeadStatus').value;
      lead.email = document.getElementById('editLeadEmail').value;
      lead.phone = document.getElementById('editLeadPhone').value;
      
      const value = document.getElementById('editLeadValue').value;
      lead.value = value ? `₹${(parseInt(value)/100000).toFixed(1)}L` : '₹0';
      
      lead.source = document.getElementById('editLeadSource').value;
      lead.region = document.getElementById('editLeadRegion').value;
      lead.notes = document.getElementById('editLeadNotes').value;
      lead.tags = document.getElementById('editLeadTags').value ? 
                document.getElementById('editLeadTags').value.split(',').map(t => t.trim()) : [];
      
      DataManager.saveAll();
      UIHelper.showToast('Lead updated successfully!', 'success');
      ScreenManager.show('leadDetail');
      loadLeadDetail(leadId);
    }
    
    static handleAddEventForm() {
      const eventId = DataManager.generateId(DataManager.data.plannerEvents);
      const startTime = document.getElementById('eventStartTime').value;
      const endTime = document.getElementById('eventEndTime').value;
      
      // Calculate duration
      let duration = '1 hour';
      if (startTime && endTime) {
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);
        const diffMinutes = (end - start) / (1000 * 60);
        
        if (diffMinutes < 60) {
          duration = `${diffMinutes} minutes`;
        } else if (diffMinutes === 60) {
          duration = '1 hour';
        } else {
          const hours = Math.floor(diffMinutes / 60);
          const minutes = diffMinutes % 60;
          duration = minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hours`;
        }
      }
      
      const newEvent = {
        id: eventId,
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        time: startTime,
        endTime: endTime,
        duration: duration,
        type: document.getElementById('eventType').value,
        description: document.getElementById('eventDescription').value,
        attendees: document.getElementById('eventAttendees').value ? 
                   document.getElementById('eventAttendees').value.split(',').map(a => a.trim()) : [],
        location: document.getElementById('eventLocation').value
      };
      
      DataManager.data.plannerEvents.push(newEvent);
      DataManager.saveAll();
      
      // Close modal and refresh
      document.getElementById('addEventModal').classList.add('hidden');
      document.getElementById('addEventForm').reset();
      PlannerManager.loadPlannerEvents();
      
      UIHelper.showToast('Event added successfully!', 'success');
    }
    
    static handleNewVisitForm() {
      const visitId = DataManager.generateId(DataManager.data.visits);
      const customerId = document.getElementById('newVisitCustomer').value;
      const customer = DataManager.data.customers[customerId];
      
      if (!customer) {
        UIHelper.showToast('Please select a customer', 'error');
        return;
      }
      
      const cost = document.getElementById('newVisitCost').value;
      
      DataManager.data.visits[visitId] = {
        id: visitId,
        customerId: customerId,
        customerName: customer.name,
        visitDate: document.getElementById('newVisitDate').value,
        visitTime: document.getElementById('newVisitTime').value,
        purpose: document.getElementById('newVisitPurpose').value,
        location: document.getElementById('newVisitLocation').value,
        attendees: document.getElementById('newVisitAttendees').value ? 
                   document.getElementById('newVisitAttendees').value.split(',').map(a => a.trim()) : [],
        notes: document.getElementById('newVisitNotes').value,
        followUpAction: document.getElementById('newVisitFollowUp').value,
        followUpDate: document.getElementById('newVisitFollowUpDate').value,
        status: document.getElementById('newVisitStatus').value,
        visitDuration: document.getElementById('newVisitDuration').value + ' hours',
        travelCost: cost ? `₹${cost}` : '₹0',
        outcome: document.getElementById('newVisitOutcome').value,
        contactPerson: customer.contact
      };
      
      DataManager.saveAll();
      UIHelper.showToast('Visit scheduled successfully!', 'success');
      ScreenManager.show('visits');
      document.getElementById('newVisitForm').reset();
      VisitManager.updateVisitCounts();
    }
    
    static handleEditVisitForm() {
      const visitId = document.getElementById('editVisitId').value;
      const visit = DataManager.data.visits[visitId];
      
      if (!visit) {
        UIHelper.showToast('Visit not found', 'error');
        return;
      }
      
      const customerId = document.getElementById('editVisitCustomer').value;
      const customer = DataManager.data.customers[customerId];
      
      if (!customer) {
        UIHelper.showToast('Please select a customer', 'error');
        return;
      }
      
      const cost = document.getElementById('editVisitCost').value;
      
      visit.customerId = customerId;
      visit.customerName = customer.name;
      visit.visitDate = document.getElementById('editVisitDate').value;
      visit.visitTime = document.getElementById('editVisitTime').value;
      visit.purpose = document.getElementById('editVisitPurpose').value;
      visit.location = document.getElementById('editVisitLocation').value;
      visit.attendees = document.getElementById('editVisitAttendees').value ? 
                       document.getElementById('editVisitAttendees').value.split(',').map(a => a.trim()) : [];
      visit.notes = document.getElementById('editVisitNotes').value;
      visit.followUpAction = document.getElementById('editVisitFollowUp').value;
      visit.followUpDate = document.getElementById('editVisitFollowUpDate').value;
      visit.status = document.getElementById('editVisitStatus').value;
      visit.visitDuration = document.getElementById('editVisitDuration').value + ' hours';
      visit.travelCost = cost ? `₹${cost}` : '₹0';
      visit.outcome = document.getElementById('editVisitOutcome').value;
      visit.contactPerson = customer.contact;
      
      DataManager.saveAll();
      UIHelper.showToast('Visit updated successfully!', 'success');
      ScreenManager.show('visitDetail');
      loadVisitDetail(visitId);
      VisitManager.updateVisitCounts();
    }
  }

  // ========== PLANNER MANAGER ==========
  class PlannerManager {
    static init() {
      this.setupEventListeners();
    }
    
    static loadPlannerEvents() {
      const container = document.getElementById('plannerEvents');
      if (!container) return;
      
      container.innerHTML = '';
      
      const selectedDate = this.getSelectedCalendarDate();
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      
      // Filter events for selected date
      const todaysEvents = DataManager.data.plannerEvents.filter(event => 
        event.date === selectedDateStr
      );
      
      if (todaysEvents.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-calendar-plus"></i>
            <h4>No events scheduled</h4>
            <p>Add an event to plan your day</p>
          </div>
        `;
        return;
      }
      
      todaysEvents.forEach(event => {
        const eventElement = this.createPlannerEventElement(event);
        container.appendChild(eventElement);
      });
      
      // Update date title
      const titleElement = document.getElementById('plannerDateTitle');
      if (titleElement) {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        titleElement.textContent = selectedDate.toLocaleDateString('en-US', options);
      }
    }
    
    static createPlannerEventElement(event) {
      const element = document.createElement('div');
      element.className = 'planner-event';
      
      let icon = '📍';
      let iconClass = 'event-type-meeting';
      
      switch(event.type) {
        case 'call':
          icon = '📞';
          iconClass = 'event-type-call';
          break;
        case 'video':
          icon = '🎥';
          iconClass = 'event-type-video';
          break;
        case 'meeting':
          icon = '📍';
          iconClass = 'event-type-meeting';
          break;
        case 'task':
          icon = '✓';
          iconClass = 'event-type-task';
          break;
        case 'reminder':
          icon = '⏰';
          iconClass = 'event-type-reminder';
          break;
      }
      
      element.innerHTML = `
        <div class="event-type ${iconClass}">
          ${icon}
        </div>
        <div class="event-content">
          <div class="event-header">
            <h4>${event.title}</h4>
            <span class="event-badge">${event.type}</span>
          </div>
          <div class="event-details">
            <span>⏰ ${event.time} ${event.endTime ? `- ${event.endTime}` : ''} (${event.duration})</span>
            ${event.attendees && event.attendees.length > 0 ? 
              `<span>👥 ${event.attendees.join(', ')}</span>` : ''}
            ${event.location ? `<span>📍 ${event.location}</span>` : ''}
          </div>
          ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
        </div>
      `;
      
      return element;
    }
    
    static getSelectedCalendarDate() {
      const selectedElement = document.querySelector('.calendar-date.selected');
      if (selectedElement) {
        const dayNumber = selectedElement.querySelector('.day-number').textContent;
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), parseInt(dayNumber));
      }
      return new Date();
    }
    
    static setupEventListeners() {
      // Add Event Modal
      document.getElementById('addEventBtn')?.addEventListener('click', () => {
        const modal = document.getElementById('addEventModal');
        if (modal) {
          modal.classList.remove('hidden');
          const selectedDate = this.getSelectedCalendarDate();
          document.getElementById('eventDate').value = selectedDate.toISOString().split('T')[0];
        }
      });
      
      document.getElementById('addEventHeaderBtn')?.addEventListener('click', () => {
        document.getElementById('addEventBtn').click();
      });
      
      document.getElementById('closeEventModal')?.addEventListener('click', () => {
        document.getElementById('addEventModal').classList.add('hidden');
      });
      
      document.getElementById('cancelEventForm')?.addEventListener('click', () => {
        document.getElementById('addEventModal').classList.add('hidden');
      });
      
      // Calendar date clicks
      document.addEventListener('click', (e) => {
        if (e.target.closest('.calendar-date')) {
          document.querySelectorAll('.calendar-date').forEach(el => {
            el.classList.remove('selected');
          });
          e.target.closest('.calendar-date').classList.add('selected');
          this.loadPlannerEvents();
        }
      });
      
      // Calendar navigation
      document.getElementById('todayBtn')?.addEventListener('click', () => {
        this.updateCalendarToday();
        this.loadPlannerEvents();
      });
      
      document.getElementById('prevWeekBtn')?.addEventListener('click', () => {
        UIHelper.showToast('Previous week navigation coming soon!');
      });
      
      document.getElementById('nextWeekBtn')?.addEventListener('click', () => {
        UIHelper.showToast('Next week navigation coming soon!');
      });
    }
    
    static updateCalendarToday() {
      const today = new Date();
      const todayDay = today.getDate();
      
      document.querySelectorAll('.calendar-date').forEach(el => {
        el.classList.remove('today', 'selected');
        const dayNumber = parseInt(el.querySelector('.day-number').textContent);
        if (dayNumber === todayDay) {
          el.classList.add('today', 'selected');
        }
      });
    }
  }

  // ========== SALES MANAGER ==========
  class SalesManager {
    static init() {
      this.setupEventListeners();
    }
    
    static loadSalesData() {
      const timeRangeSelect = document.getElementById('timeRangeSelect');
      if (!timeRangeSelect) return;
      
      timeRangeSelect.addEventListener('change', (e) => {
        this.updateSalesData(e.target.value);
      });
      
      this.updateSalesData('q1');
    }
    
    static updateSalesData(timeRange) {
      const salesData = {
        q1: {
          period: 'Q1 2024',
          current: 4500000,
          target: 5000000,
          months: [
            { name: 'January', achieved: 1800000, target: 1667000, status: 'achieved' },
            { name: 'February', achieved: 1500000, target: 1667000, status: 'near' },
            { name: 'March', achieved: 1200000, target: 1666000, status: 'below' }
          ]
        },
        q2: {
          period: 'Q2 2024',
          current: 0,
          target: 5500000,
          months: [
            { name: 'April', achieved: 0, target: 1833000, status: 'below' },
            { name: 'May', achieved: 0, target: 1833000, status: 'below' },
            { name: 'June', achieved: 0, target: 1834000, status: 'below' }
          ]
        }
      };
      
      const data = salesData[timeRange] || salesData.q1;
      
      // Update UI elements
      const periodElement = document.getElementById('salesTargetPeriod');
      const currentPeriodElement = document.getElementById('currentPeriodText');
      if (periodElement) periodElement.textContent = data.period + ' Performance';
      if (currentPeriodElement) currentPeriodElement.textContent = data.period;
      
      // Update amounts
      const currentAmount = document.getElementById('salesCurrentAmount');
      const targetAmount = document.getElementById('salesTargetAmount');
      const achievedAmount = document.getElementById('achievedAmount');
      const remainingAmount = document.getElementById('remainingAmount');
      
      if (currentAmount) currentAmount.textContent = `₹${(data.current/100000).toFixed(1)}L`;
      if (targetAmount) targetAmount.textContent = `₹${(data.target/100000).toFixed(1)}L`;
      if (achievedAmount) achievedAmount.textContent = `₹${(data.current/100000).toFixed(1)}L`;
      if (remainingAmount) remainingAmount.textContent = `₹${((data.target - data.current)/100000).toFixed(1)}L`;
      
      // Update progress
      const progress = (data.current / data.target) * 100;
      const progressBar = document.getElementById('salesProgressBar');
      const progressText = document.getElementById('salesProgressText');
      
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.style.backgroundColor = progress >= 100 ? '#22c55e' : 
                                          progress >= 80 ? '#f59e0b' : '#ef4444';
      }
      
      if (progressText) {
        if (progress >= 100) {
          progressText.textContent = `✅ ${progress.toFixed(0)}% Complete - Target Achieved!`;
          progressText.style.color = '#22c55e';
        } else if (progress >= 80) {
          progressText.textContent = `🟡 ${progress.toFixed(0)}% Complete - On Track`;
          progressText.style.color = '#f59e0b';
        } else {
          progressText.textContent = `🔴 ${progress.toFixed(0)}% Complete - Needs Attention`;
          progressText.style.color = '#ef4444';
        }
      }
      
      // Update monthly breakdown
      this.updateMonthlyBreakdown(data.months);
    }
    
    static updateMonthlyBreakdown(months) {
      const container = document.getElementById('monthlyBreakdown');
      if (!container) return;
      
      container.innerHTML = '';
      
      months.forEach(month => {
        const monthElement = document.createElement('div');
        monthElement.className = `month-item ${month.status}`;
        
        const progress = (month.achieved / month.target) * 100;
        const progressWidth = Math.min(progress, 100);
        const progressColor = month.status === 'achieved' ? '#22c55e' : 
                             month.status === 'near' ? '#f59e0b' : '#ef4444';
        
        monthElement.innerHTML = `
          <div class="month-header">
            <span class="month-name">${month.name}</span>
            <span class="month-achievement ${month.status}">
              ₹${(month.achieved/100000).toFixed(1)}L / ₹${(month.target/100000).toFixed(1)}L
            </span>
          </div>
          <div class="month-progress">
            <div class="progress-bar">
              <span style="width: ${progressWidth}%; background-color: ${progressColor}"></span>
            </div>
          </div>
        `;
        
        container.appendChild(monthElement);
      });
    }
    
    static setupEventListeners() {
      // Add any sales-specific event listeners here
    }
  }

  // ========== QUICK ACTION MANAGER ==========
  class QuickActionManager {
    // Add this method to QuickActionManager class
static positionMenu() {
  const menu = document.getElementById('quickActionMenu');
  const navFab = document.getElementById('navFab');
  
  if (!menu || !navFab) return;
  
  // Reset positioning
  menu.style.bottom = '';
  menu.style.top = '';
  menu.style.left = '';
  menu.style.right = '';
  
  // Default position (above nav FAB)
  menu.style.bottom = '85px';
  menu.style.right = '20px';
}

// Update the toggleMenu method:
static toggleMenu() {
  const menu = document.getElementById('quickActionMenu');
  const navFab = document.getElementById('navFab');
  
  if (!this.isMenuOpen) {
    this.positionMenu();
    menu.classList.remove('hidden');
    navFab.classList.add('active');
  } else {
    menu.classList.add('hidden');
    navFab.classList.remove('active');
  }
  
  this.isMenuOpen = !this.isMenuOpen;
}

// Add to initialization
static init() {
  this.createQuickActionMenu();
  this.setupEventListeners();
  this.positionMenu(); // Initial positioning
}
    static isMenuOpen = false;
    
    static init() {
      this.createQuickActionMenu();
      this.setupEventListeners();
    }
    
    static createQuickActionMenu() {
      // Create quick action menu
      const menu = document.createElement('div');
      menu.id = 'quickActionMenu';
      menu.className = 'quick-action-menu hidden';
      menu.innerHTML = `
        <div class="quick-action-header">
          <h4>Quick Actions</h4>
          <button class="close-quick-actions" id="closeQuickActions">×</button>
        </div>
        <div class="quick-action-items">
          <button class="quick-action-item" id="quickAddLead">
            <div class="quick-action-icon lead">
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="quick-action-text">
              <h5>Add Lead</h5>
              <p>Create new lead</p>
            </div>
          </button>
          <button class="quick-action-item" id="quickAddTask">
            <div class="quick-action-icon task">
              <i class="fas fa-tasks"></i>
            </div>
            <div class="quick-action-text">
              <h5>Add Task</h5>
              <p>Create new task</p>
            </div>
          </button>
          <button class="quick-action-item" id="quickAddCustomer">
            <div class="quick-action-icon customer">
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="quick-action-text">
              <h5>Add Customer</h5>
              <p>Create new customer</p>
            </div>
          </button>
          <button class="quick-action-item" id="quickAddVisit">
            <div class="quick-action-icon visit">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="quick-action-text">
              <h5>Add Visit</h5>
              <p>Record customer visit</p>
            </div>
          </button>
          <button class="quick-action-item" id="quickAddComplaint">
            <div class="quick-action-icon complaint">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="quick-action-text">
              <h5>Add Complaint</h5>
              <p>Register complaint</p>
            </div>
          </button>
        </div>
      `;
      
      document.body.appendChild(menu);
    }
    
    static setupEventListeners() {
      // Close menu button
      document.getElementById('closeQuickActions')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeMenu();
      });
      
      // Quick action items
      document.getElementById('quickAddLead')?.addEventListener('click', () => {
        ScreenManager.show('leadForm');
        this.closeMenu();
      });
      
      document.getElementById('quickAddTask')?.addEventListener('click', () => {
        ScreenManager.show('taskForm');
        this.closeMenu();
      });
      
      document.getElementById('quickAddCustomer')?.addEventListener('click', () => {
        ScreenManager.show('customerForm');
        this.closeMenu();
      });
      
      document.getElementById('quickAddVisit')?.addEventListener('click', () => {
        ScreenManager.show('visitForm');
        this.closeMenu();
      });
      
      document.getElementById('quickAddComplaint')?.addEventListener('click', () => {
        ScreenManager.show('complaintForm');
        this.closeMenu();
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        const menu = document.getElementById('quickActionMenu');
        const navFab = document.getElementById('navFab');
        
        if (this.isMenuOpen && 
            !menu?.contains(e.target) && 
            !navFab?.contains(e.target)) {
          this.closeMenu();
        }
      });
    }
    
    static toggleMenu() {
      const menu = document.getElementById('quickActionMenu');
      const navFab = document.getElementById('navFab');
      
      if (!this.isMenuOpen) {
        menu.classList.remove('hidden');
        navFab.classList.add('active');
      } else {
        menu.classList.add('hidden');
        navFab.classList.remove('active');
      }
      
      this.isMenuOpen = !this.isMenuOpen;
    }
    
    static closeMenu() {
      const menu = document.getElementById('quickActionMenu');
      const navFab = document.getElementById('navFab');
      
      menu.classList.add('hidden');
      navFab.classList.remove('active');
      this.isMenuOpen = false;
    }
  }

  // ========== UI HELPER ==========
  class UIHelper {
    static showToast(message, type = 'info') {
      // Remove existing toast
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();
      
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
      `;
      
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
    
    static addAnimationStyles() {
      if (document.querySelector('#animation-styles')) return;
      
      const style = document.createElement('style');
      style.id = 'animation-styles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
        .toast {
          animation: slideIn 0.3s ease;
        }
        .quick-action-menu {
          animation: fadeIn 0.2s ease;
        }
        .quick-action-menu.hidden {
          animation: fadeOut 0.2s ease;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ========== LOADER FUNCTIONS ==========
  
  function loadLeadDetail(leadId) {
    const data = DataManager.data.leads[leadId];
    if (!data) return;
    
    const elements = {
      name: document.getElementById('leadDetailName'),
      company: document.getElementById('leadDetailCompany'),
      status: document.getElementById('leadDetailStatus'),
      value: document.getElementById('leadDetailValue'),
      region: document.getElementById('leadDetailRegion'),
      industry: document.getElementById('leadDetailIndustry'),
      assignedTo: document.getElementById('leadDetailAssignedTo'),
      lastContact: document.getElementById('leadDetailLastContact'),
      avatar: document.getElementById('leadDetailAvatar'),
      tags: document.getElementById('leadDetailTags')
    };
    
    if (elements.name) elements.name.textContent = data.name;
    if (elements.company) elements.company.textContent = data.company;
    if (elements.status) {
      elements.status.textContent = data.status;
      elements.status.className = `lead-badge ${data.status.toLowerCase()}`;
    }
    if (elements.value) elements.value.textContent = data.value;
    if (elements.region) elements.region.textContent = data.region;
    if (elements.industry) elements.industry.textContent = data.industry;
    if (elements.assignedTo) elements.assignedTo.textContent = data.assignedTo;
    if (elements.lastContact) elements.lastContact.textContent = data.lastContact;
    if (elements.avatar) elements.avatar.textContent = data.initials;
    
    if (elements.tags && data.tags) {
      elements.tags.innerHTML = '';
      data.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        elements.tags.appendChild(tagElement);
      });
    }
  }
  
  function loadTaskDetail(taskId) {
    const data = DataManager.data.tasks[taskId];
    if (!data) return;
    
    const elements = {
      title: document.getElementById('taskDetailTitle'),
      description: document.getElementById('taskDetailDescription'),
      priority: document.getElementById('taskDetailPriority'),
      time: document.getElementById('taskDetailTime'),
      assignedTo: document.getElementById('taskDetailAssignedTo'),
      dueDate: document.getElementById('taskDetailDueDate'),
      date: document.getElementById('taskDetailDate'),
      relatedLead: document.getElementById('taskDetailRelatedLead')
    };
    
    if (elements.title) elements.title.textContent = data.title;
    if (elements.description) elements.description.textContent = data.description;
    if (elements.priority) {
      elements.priority.textContent = data.priority;
      elements.priority.className = `task-badge ${data.priority.toLowerCase()}`;
    }
    if (elements.time) elements.time.textContent = data.time;
    if (elements.assignedTo) elements.assignedTo.textContent = data.assignedTo;
    if (elements.dueDate) elements.dueDate.textContent = data.dueDate;
    if (elements.date) elements.date.textContent = `Due ${data.dueDate}`;
    if (elements.relatedLead) elements.relatedLead.textContent = data.relatedLead;
  }
  
  function loadOpportunityDetail(opportunityId) {
    const data = DataManager.data.opportunities[opportunityId];
    if (!data) return;
    
    const elements = {
      title: document.getElementById('opportunityDetailTitle'),
      company: document.getElementById('opportunityDetailCompany'),
      stage: document.getElementById('opportunityDetailStage'),
      value: document.getElementById('opportunityDetailValue'),
      probability: document.getElementById('opportunityDetailProbability'),
      description: document.getElementById('opportunityDetailDescription'),
      owner: document.getElementById('opportunityDetailOwner'),
      expectedClose: document.getElementById('opportunityDetailExpectedClose')
    };
    
    if (elements.title) elements.title.textContent = data.title;
    if (elements.company) elements.company.textContent = data.company;
    if (elements.stage) {
      elements.stage.textContent = data.stage;
      elements.stage.className = `opportunity-badge ${data.stage.toLowerCase()}`;
    }
    if (elements.value) elements.value.textContent = data.value;
    if (elements.probability) elements.probability.textContent = `${data.probability}% probability`;
    if (elements.description) elements.description.textContent = data.description;
    if (elements.owner) elements.owner.textContent = data.owner;
    if (elements.expectedClose) elements.expectedClose.textContent = data.expectedClose;
  }
  
  function loadProposalDetail(proposalId) {
    const data = DataManager.data.proposals[proposalId];
    if (!data) return;
    
    const elements = {
      title: document.getElementById('proposalDetailTitle'),
      company: document.getElementById('proposalDetailCompany'),
      status: document.getElementById('proposalDetailStatus'),
      value: document.getElementById('proposalDetailValue'),
      validUntil: document.getElementById('proposalDetailValidUntil'),
      description: document.getElementById('proposalDetailDescription'),
      owner: document.getElementById('proposalDetailOwner'),
      createdAt: document.getElementById('proposalDetailCreatedAt')
    };
    
    if (elements.title) elements.title.textContent = data.title;
    if (elements.company) elements.company.textContent = data.company;
    if (elements.status) {
      elements.status.textContent = data.status;
      elements.status.className = `proposal-badge ${data.status}`;
    }
    if (elements.value) elements.value.textContent = data.value;
    if (elements.validUntil) elements.validUntil.textContent = data.validUntil;
    if (elements.description) elements.description.textContent = data.description;
    if (elements.owner) elements.owner.textContent = data.owner;
    if (elements.createdAt) elements.createdAt.textContent = data.createdAt;
  }
  
  function loadCustomerDetail(customerId) {
    const data = DataManager.data.customers[customerId];
    if (!data) return;
    
    const elements = {
      name: document.getElementById('customerDetailName'),
      nameFull: document.getElementById('customerDetailNameFull'),
      contact: document.getElementById('customerDetailContact'),
      email: document.getElementById('customerDetailEmail'),
      phone: document.getElementById('customerDetailPhone'),
      location: document.getElementById('customerDetailLocation'),
      value: document.getElementById('customerDetailValue'),
      avatar: document.getElementById('customerDetailAvatar'),
      status: document.getElementById('customerDetailStatus'),
      since: document.getElementById('customerDetailSince')
    };
    
    if (elements.name) elements.name.textContent = data.name;
    if (elements.nameFull) elements.nameFull.textContent = data.name;
    if (elements.contact) elements.contact.textContent = data.contact;
    if (elements.email) elements.email.textContent = data.email;
    if (elements.phone) elements.phone.textContent = data.phone;
    if (elements.location) elements.location.textContent = data.location;
    if (elements.value) elements.value.textContent = data.value;
    if (elements.avatar) elements.avatar.textContent = data.initials;
    if (elements.status) {
      elements.status.textContent = data.status;
      elements.status.className = `customer-badge ${data.status}`;
    }
    if (elements.since) elements.since.textContent = data.since;
    
    // Store customer ID on the screen for visit creation
    const screen = document.getElementById('customerDetailScreen');
    if (screen) {
      screen.dataset.customerId = customerId;
    }
  }
  
  function loadComplaintDetail(complaintId) {
    const data = DataManager.data.complaints[complaintId];
    if (!data) return;
    
    const elements = {
      title: document.getElementById('complaintDetailTitle'),
      customer: document.getElementById('complaintDetailCustomer'),
      type: document.getElementById('complaintDetailType'),
      priority: document.getElementById('complaintDetailPriority'),
      status: document.getElementById('complaintDetailStatus'),
      description: document.getElementById('complaintDetailDescription'),
      contactPerson: document.getElementById('complaintDetailContactPerson'),
      contactEmail: document.getElementById('complaintDetailContactEmail'),
      contactPhone: document.getElementById('complaintDetailContactPhone'),
      createdAt: document.getElementById('complaintDetailCreatedAt')
    };
    
    if (elements.title) elements.title.textContent = data.title;
    if (elements.customer) elements.customer.textContent = data.customer;
    if (elements.type) elements.type.textContent = data.type;
    if (elements.priority) {
      elements.priority.textContent = data.priority;
      elements.priority.className = `complaint-priority-badge ${data.priority}`;
    }
    if (elements.status) {
      elements.status.textContent = data.status;
      elements.status.className = `complaint-status-badge ${data.status}`;
    }
    if (elements.description) elements.description.textContent = data.description;
    if (elements.contactPerson) elements.contactPerson.textContent = data.contactPerson;
    if (elements.contactEmail) elements.contactEmail.textContent = data.contactEmail;
    if (elements.contactPhone) elements.contactPhone.textContent = data.contactPhone;
    if (elements.createdAt) elements.createdAt.textContent = data.createdAt;
  }
  
  function loadVisitDetail(visitId) {
    const data = DataManager.data.visits[visitId];
    if (!data) return;
    
    const elements = {
      title: document.getElementById('visitDetailTitle'),
      customer: document.getElementById('visitDetailCustomer'),
      customerName: document.getElementById('visitDetailCustomerName'),
      dateTime: document.getElementById('visitDetailDateTime'),
      status: document.getElementById('visitDetailStatus'),
      contact: document.getElementById('visitDetailContact'),
      location: document.getElementById('visitDetailLocation'),
      duration: document.getElementById('visitDetailDuration'),
      attendees: document.getElementById('visitDetailAttendees'),
      purpose: document.getElementById('visitDetailPurpose'),
      notes: document.getElementById('visitDetailNotes'),
      followUp: document.getElementById('visitDetailFollowUp'),
      followUpDate: document.getElementById('visitDetailFollowUpDate'),
      travelCost: document.getElementById('visitDetailTravelCost'),
      avatar: document.getElementById('visitDetailAvatar')
    };
    
    if (elements.title) elements.title.textContent = data.purpose;
    if (elements.customer) elements.customer.textContent = data.customerName;
    if (elements.customerName) elements.customerName.textContent = data.customerName;
    if (elements.dateTime) elements.dateTime.textContent = `${data.visitDate} • ${data.visitTime}`;
    if (elements.status) {
      elements.status.textContent = data.status;
      elements.status.className = `visit-badge ${data.status}`;
    }
    if (elements.contact) elements.contact.textContent = data.contactPerson || 'Not specified';
    if (elements.location) elements.location.textContent = data.location;
    if (elements.duration) elements.duration.textContent = data.visitDuration;
    if (elements.attendees) elements.attendees.textContent = data.attendees ? data.attendees.join(', ') : 'None';
    if (elements.purpose) elements.purpose.textContent = data.purpose;
    if (elements.notes) elements.notes.textContent = data.notes || 'No notes available';
    if (elements.followUp) elements.followUp.textContent = data.followUpAction || 'No follow-up action';
    if (elements.followUpDate) elements.followUpDate.textContent = data.followUpDate || 'Not scheduled';
    if (elements.travelCost) elements.travelCost.textContent = data.travelCost || '₹0';
    if (elements.avatar) elements.avatar.textContent = data.customerName.charAt(0);
    
    // Store visit ID on the screen for editing
    const screen = document.getElementById('visitDetailScreen');
    if (screen) {
      screen.dataset.visitId = visitId;
    }
  }
  
  function loadOpportunities() {
    const container = document.getElementById('opportunitiesScreen')?.querySelector('.leads-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.entries(DataManager.data.opportunities).forEach(([id, opportunity]) => {
      const element = document.createElement('div');
      element.className = 'opportunity-card';
      element.dataset.opportunityId = id;
      
      element.innerHTML = `
        <div class="opportunity-icon">
          <div class="icon-box ${opportunity.stage.toLowerCase() === 'negotiation' ? 'success' : 'primary'}">📈</div>
        </div>
        <div class="opportunity-info">
          <div class="opportunity-header">
            <h4 class="opportunity-title">${opportunity.title}</h4>
            <span class="opportunity-badge ${opportunity.stage.toLowerCase() === 'negotiation' ? 'success' : 'primary'}">${opportunity.stage}</span>
          </div>
          <p class="opportunity-company">${opportunity.company}</p>
          <div class="opportunity-details">
            <span class="opportunity-value">${opportunity.value}</span>
            <span class="opportunity-probability">${opportunity.probability}% probability</span>
          </div>
          <div class="progress-bar">
            <span class="progress-fill" style="width: ${opportunity.probability}%"></span>
          </div>
        </div>
      `;
      
      element.addEventListener('click', () => {
        loadOpportunityDetail(id);
        ScreenManager.show('opportunityDetail');
      });
      
      container.appendChild(element);
    });
  }
  
  function loadProposals() {
    const container = document.getElementById('proposalsScreen')?.querySelector('.leads-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.entries(DataManager.data.proposals).forEach(([id, proposal]) => {
      const element = document.createElement('div');
      element.className = 'proposal-card';
      element.dataset.proposalId = id;
      
      element.innerHTML = `
        <div class="proposal-icon">
          <div class="icon-box ${proposal.status === 'approved' ? 'success' : 'primary'}">📄</div>
        </div>
        <div class="proposal-info">
          <div class="proposal-header">
            <h4 class="proposal-title">${proposal.title}</h4>
            <span class="proposal-badge ${proposal.status === 'approved' ? 'success' : 'warning'}">${proposal.status}</span>
          </div>
          <p class="proposal-company">${proposal.company}</p>
          <div class="proposal-details">
            <span class="proposal-value">${proposal.value}</span>
            <span class="proposal-date">⏰ ${proposal.validUntil}</span>
          </div>
        </div>
      `;
      
      element.addEventListener('click', () => {
        loadProposalDetail(id);
        ScreenManager.show('proposalDetail');
      });
      
      container.appendChild(element);
    });
  }
  
  function loadCustomers() {
    const container = document.getElementById('customersScreen')?.querySelector('.leads-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.entries(DataManager.data.customers).forEach(([id, customer]) => {
      const element = document.createElement('div');
      element.className = 'customer-card';
      element.dataset.customerId = id;
      
      element.innerHTML = `
        <div class="customer-avatar ${customer.status === 'active' ? 'success-gradient' : 'primary-gradient'}">${customer.initials}</div>
        <div class="customer-info">
          <div class="customer-header">
            <h4 class="customer-name">${customer.name}</h4>
            <span class="customer-badge ${customer.status}">${customer.status}</span>
          </div>
          <p class="customer-contact">${customer.contact}</p>
          <div class="customer-details">
            <div class="detail-row">
              <i class="fas fa-envelope"></i>
              <span>${customer.email}</span>
            </div>
            <div class="detail-row">
              <i class="fas fa-phone"></i>
              <span>${customer.phone}</span>
            </div>
            <div class="detail-row">
              <i class="fas fa-map-marker-alt"></i>
              <span>${customer.location}</span>
            </div>
            <div class="detail-row">
              <i class="fas fa-rupee-sign"></i>
              <span class="customer-value">${customer.value}</span>
            </div>
          </div>
        </div>
      `;
      
      element.addEventListener('click', () => {
        loadCustomerDetail(id);
        ScreenManager.show('customerDetail');
      });
      
      container.appendChild(element);
    });
  }
  
  function loadComplaints() {
    const container = document.getElementById('complaintsScreen')?.querySelector('.leads-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.entries(DataManager.data.complaints).forEach(([id, complaint]) => {
      const element = document.createElement('div');
      element.className = 'complaint-card';
      element.dataset.complaintId = id;
      
      element.innerHTML = `
        <div class="complaint-icon">
          <div class="icon-box ${complaint.priority === 'high' ? 'warning' : 'default'}">⚠</div>
        </div>
        <div class="complaint-info">
          <div class="complaint-header">
            <h4 class="complaint-title">${complaint.title}</h4>
            <div class="complaint-badges">
              <span class="complaint-priority-badge ${complaint.priority}">${complaint.priority}</span>
              <span class="complaint-status-badge ${complaint.status}">${complaint.status}</span>
            </div>
          </div>
          <p class="complaint-customer">${complaint.customer}</p>
          <p class="complaint-description">${complaint.description}</p>
          <div class="complaint-details">
            <span class="complaint-date">⏰ ${complaint.createdAt}</span>
            <span class="complaint-assigned">👤 ${complaint.assignedTo}</span>
          </div>
        </div>
      `;
      
      element.addEventListener('click', () => {
        loadComplaintDetail(id);
        ScreenManager.show('complaintDetail');
      });
      
      container.appendChild(element);
    });
  }
  
  function loadInsights() {
    const container = document.getElementById('insightsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    DataManager.data.insights.forEach(insight => {
      const element = document.createElement('div');
      element.className = 'insight-card';
      
      let icon = '✨';
      let iconClass = 'insight-opportunity';
      
      switch(insight.type) {
        case 'opportunity':
          icon = '📈';
          iconClass = 'insight-opportunity';
          break;
        case 'action':
          icon = '🎯';
          iconClass = 'insight-action';
          break;
        case 'trend':
          icon = '📊';
          iconClass = 'insight-trend';
          break;
        case 'warning':
          icon = '⚠️';
          iconClass = 'insight-warning';
          break;
      }
      
      element.innerHTML = `
        <div class="insight-icon ${iconClass}">
          ${icon}
        </div>
        <div class="insight-content">
          <div class="insight-header">
            <h4>${insight.title}</h4>
            <span class="insight-impact insight-impact-${insight.impact}">${insight.impact}</span>
          </div>
          <p>${insight.description}</p>
        </div>
      `;
      
      container.appendChild(element);
    });
  }

  // ========== INITIALIZATION ==========
  function init() {
    console.log('Initializing SalesBuddy...');
    
    // Initialize data
    DataManager.init();
    
    // Initialize UI helpers
    UIHelper.addAnimationStyles();
    
    // Initialize managers
    StatusManager.init();
    ScreenManager.init();
    NotificationManager.init();
    TaskManager.init();
    LeadManager.init();
    FormManager.init();
    PlannerManager.init();
    SalesManager.init();
    VisitManager.init();
    QuickActionManager.init();
    
    // Setup FAB and chat
    setupFAB();
    
    // Show dashboard initially
    ScreenManager.show('dashboard');
    
    // Initialize visit counts
    VisitManager.updateVisitCounts();
    
    console.log('SalesBuddy initialized successfully!');
  }
  
  function setupFAB() {
    const chatModal = document.getElementById('chatModal');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatInput = document.getElementById('chatInput');
    
    if (closeChatBtn && chatModal) {
      closeChatBtn.addEventListener('click', () => {
        chatModal.classList.add('hidden');
      });
    }
    
    if (sendMessageBtn && chatInput) {
      sendMessageBtn.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
          addChatMessage(message, 'user');
          chatInput.value = '';
          
          // Simulate AI response
          setTimeout(() => {
            const responses = [
              "I can help you with that! What specific information do you need?",
              "Based on your data, I recommend following up with 3 leads today.",
              "Your sales target for this quarter is 90% achieved. Great job!",
              "I see you have 2 tasks due today. Would you like me to remind you about them?",
              "I notice you have a customer visit scheduled for tomorrow. Need help preparing?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addChatMessage(randomResponse, 'ai');
          }, 1000);
        }
      });
      
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendMessageBtn.click();
        }
      });
    }
  }
  
  function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}`;
    
    const avatar = sender === 'user' ? '👤' : '🤖';
    
    messageElement.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        <p>${message}</p>
      </div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Start the application
  init();
});