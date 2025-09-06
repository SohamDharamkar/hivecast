import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from '../firebase/config';

// Types
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  budget?: string;
  isPublic: boolean;
  status: string;
  progress: number;
  collaborators: number;
  createdAt: string;
  creatorId: string;
  creatorName: string;
  image?: string;
  tags?: string[];
  files?: string[];
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  skills: string[];
  experience?: string;
  role?: string;
  portfolio?: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  duration: string;
  pay: string;
  description: string;
  skills: string[];
  posterId: string;
  posterName: string;
  postedAt: string;
  applicants: number;
  isActive: boolean;
}

export interface Connection {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'project' | 'profile' | 'job';
  createdAt: string;
}

// Demo data fallback
const demoProjects: Project[] = [
  {
    id: 'demo-1',
    title: 'Urban Symphony',
    description: 'A cinematic exploration of city life through the lens of music and movement.',
    category: 'Short Film',
    budget: '$15,000',
    isPublic: true,
    status: 'In Progress',
    progress: 65,
    collaborators: 5,
    createdAt: new Date().toISOString(),
    creatorId: 'demo-user',
    creatorName: 'Demo User',
    tags: ['Cinematography', 'Music', 'Urban'],
  },
  {
    id: 'demo-2',
    title: 'Midnight Dreams',
    description: 'A psychological thriller exploring the boundaries between dreams and reality.',
    category: 'Feature Film',
    budget: '$85,000',
    isPublic: true,
    status: 'Pre-Production',
    progress: 25,
    collaborators: 12,
    createdAt: new Date().toISOString(),
    creatorId: 'demo-user-2',
    creatorName: 'Sarah Chen',
    tags: ['Thriller', 'Psychology', 'Drama'],
  }
];

// Projects
export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt'>): Promise<string> => {
  if (!isFirebaseConfigured()) {
    // Demo mode - store in localStorage
    const projects = JSON.parse(localStorage.getItem('hivecast_projects') || '[]');
    const newProject = {
      ...projectData,
      id: 'project-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    localStorage.setItem('hivecast_projects', JSON.stringify(projects));
    return newProject.id;
  }

  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const getProjects = async (userId?: string): Promise<Project[]> => {
  if (!isFirebaseConfigured()) {
    // Demo mode - return from localStorage or demo data
    const stored = localStorage.getItem('hivecast_projects');
    if (stored) {
      const projects = JSON.parse(stored);
      return userId ? projects.filter((p: Project) => p.creatorId === userId) : projects;
    }
    return userId ? demoProjects.filter(p => p.creatorId === userId) : demoProjects;
  }

  try {
    let q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    
    if (userId) {
      q = query(collection(db, 'projects'), where('creatorId', '==', userId), orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as Project[];
  } catch (error) {
    console.error('Error getting projects:', error);
    return [];
  }
};

export const updateProject = async (projectId: string, updates: Partial<Project>): Promise<void> => {
  if (!isFirebaseConfigured()) {
    // Demo mode
    const projects = JSON.parse(localStorage.getItem('hivecast_projects') || '[]');
    const index = projects.findIndex((p: Project) => p.id === projectId);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates };
      localStorage.setItem('hivecast_projects', JSON.stringify(projects));
    }
    return;
  }

  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId: string): Promise<void> => {
  if (!isFirebaseConfigured()) {
    // Demo mode
    const projects = JSON.parse(localStorage.getItem('hivecast_projects') || '[]');
    const filtered = projects.filter((p: Project) => p.id !== projectId);
    localStorage.setItem('hivecast_projects', JSON.stringify(filtered));
    return;
  }

  try {
    await deleteDoc(doc(db, 'projects', projectId));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// User Profiles
export const createUserProfile = async (profileData: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<void> => {
  if (!isFirebaseConfigured()) {
    localStorage.setItem('hivecast_profile', JSON.stringify({
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    return;
  }

  try {
    await doc(db, 'profiles', profileData.uid).set({
      ...profileData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (!isFirebaseConfigured()) {
    const stored = localStorage.getItem('hivecast_profile');
    return stored ? JSON.parse(stored) : null;
  }

  try {
    const docSnap = await getDoc(doc(db, 'profiles', userId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<void> => {
  if (!isFirebaseConfigured()) {
    const stored = localStorage.getItem('hivecast_profile');
    if (stored) {
      const profile = JSON.parse(stored);
      const updated = { ...profile, ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem('hivecast_profile', JSON.stringify(updated));
    }
    return;
  }

  try {
    const profileRef = doc(db, 'profiles', userId);
    await updateDoc(profileRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// File Upload
export const uploadFile = async (file: File, path: string): Promise<string> => {
  if (!isFirebaseConfigured()) {
    // Demo mode - return a placeholder URL
    return `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400`;
  }

  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Jobs
export const createJob = async (jobData: Omit<Job, 'id' | 'postedAt' | 'applicants'>): Promise<string> => {
  if (!isFirebaseConfigured()) {
    const jobs = JSON.parse(localStorage.getItem('hivecast_jobs') || '[]');
    const newJob = {
      ...jobData,
      id: 'job-' + Date.now(),
      postedAt: new Date().toISOString(),
      applicants: 0,
    };
    jobs.push(newJob);
    localStorage.setItem('hivecast_jobs', JSON.stringify(jobs));
    return newJob.id;
  }

  try {
    const docRef = await addDoc(collection(db, 'jobs'), {
      ...jobData,
      postedAt: serverTimestamp(),
      applicants: 0,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const getJobs = async (): Promise<Job[]> => {
  if (!isFirebaseConfigured()) {
    return JSON.parse(localStorage.getItem('hivecast_jobs') || '[]');
  }

  try {
    const q = query(collection(db, 'jobs'), orderBy('postedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      postedAt: doc.data().postedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as Job[];
  } catch (error) {
    console.error('Error getting jobs:', error);
    return [];
  }
};

// Favorites
export const addToFavorites = async (userId: string, itemId: string, itemType: 'project' | 'profile' | 'job'): Promise<void> => {
  if (!isFirebaseConfigured()) {
    const favorites = JSON.parse(localStorage.getItem('hivecast_favorites') || '[]');
    const newFavorite = {
      id: 'fav-' + Date.now(),
      userId,
      itemId,
      itemType,
      createdAt: new Date().toISOString(),
    };
    favorites.push(newFavorite);
    localStorage.setItem('hivecast_favorites', JSON.stringify(favorites));
    return;
  }

  try {
    await addDoc(collection(db, 'favorites'), {
      userId,
      itemId,
      itemType,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (userId: string, itemId: string): Promise<void> => {
  if (!isFirebaseConfigured()) {
    const favorites = JSON.parse(localStorage.getItem('hivecast_favorites') || '[]');
    const filtered = favorites.filter((f: Favorite) => !(f.userId === userId && f.itemId === itemId));
    localStorage.setItem('hivecast_favorites', JSON.stringify(filtered));
    return;
  }

  try {
    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', userId),
      where('itemId', '==', itemId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

export const getFavorites = async (userId: string): Promise<Favorite[]> => {
  if (!isFirebaseConfigured()) {
    const favorites = JSON.parse(localStorage.getItem('hivecast_favorites') || '[]');
    return favorites.filter((f: Favorite) => f.userId === userId);
  }

  try {
    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as Favorite[];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Connections
export const sendConnectionRequest = async (senderId: string, receiverId: string): Promise<void> => {
  if (!isFirebaseConfigured()) {
    const connections = JSON.parse(localStorage.getItem('hivecast_connections') || '[]');
    const newConnection = {
      id: 'conn-' + Date.now(),
      senderId,
      receiverId,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    connections.push(newConnection);
    localStorage.setItem('hivecast_connections', JSON.stringify(connections));
    return;
  }

  try {
    await addDoc(collection(db, 'connections'), {
      senderId,
      receiverId,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error sending connection request:', error);
    throw error;
  }
};

export const updateConnectionStatus = async (connectionId: string, status: 'accepted' | 'declined'): Promise<void> => {
  if (!isFirebaseConfigured()) {
    const connections = JSON.parse(localStorage.getItem('hivecast_connections') || '[]');
    const index = connections.findIndex((c: Connection) => c.id === connectionId);
    if (index !== -1) {
      connections[index] = { ...connections[index], status, updatedAt: new Date().toISOString() };
      localStorage.setItem('hivecast_connections', JSON.stringify(connections));
    }
    return;
  }

  try {
    const connectionRef = doc(db, 'connections', connectionId);
    await updateDoc(connectionRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating connection status:', error);
    throw error;
  }
};

export const getConnections = async (userId: string): Promise<Connection[]> => {
  if (!isFirebaseConfigured()) {
    const connections = JSON.parse(localStorage.getItem('hivecast_connections') || '[]');
    return connections.filter((c: Connection) => c.senderId === userId || c.receiverId === userId);
  }

  try {
    const q1 = query(collection(db, 'connections'), where('senderId', '==', userId));
    const q2 = query(collection(db, 'connections'), where('receiverId', '==', userId));
    
    const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
    
    const connections: Connection[] = [];
    snapshot1.forEach(doc => {
      connections.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as Connection);
    });
    
    snapshot2.forEach(doc => {
      connections.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as Connection);
    });
    
    return connections;
  } catch (error) {
    console.error('Error getting connections:', error);
    return [];
  }
};