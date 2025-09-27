import React, { useEffect, useState, useCallback } from 'react';
import GlobalLayout from '../core/global';
import { db } from '../core/firebase';
import { collection, getDocs, setDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { 
  Mail, Plus, CheckCircle, ArrowLeft, Edit3, Trash2, AlertCircle, Save 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Lightweight UI primitives (replace later with a design system if desired)
function Input(props) { return <input {...props} className={(props.className||'') + ' w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/40'} />; }
function Button({ children, className='', variant, size, ...rest }) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm';
  const v = variant === 'outline' ? 'border border-white/30 bg-transparent hover:bg-white/10' : (variant === 'ghost' ? 'bg-transparent hover:bg-white/10' : 'bg-blue-600 hover:bg-blue-700');
  const s = size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-4 py-2';
  return <button {...rest} className={`${base} ${v} ${s} ${className}`}>{children}</button>; }
function Badge({ children, className='' }) { return <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${className}`}>{children}</span>; }
function Label(props) { return <label {...props} className={(props.className||'') + ' text-sm font-medium'} />; }

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export default function Admin({ onLogout }) {
  const navigate = useNavigate();
  const [allowedEmails, setAllowedEmails] = useState([]); // current working list
  const [originalEmails, setOriginalEmails] = useState([]); // snapshot from server
  const [newEmail, setNewEmail] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingEmail, setEditingEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const normalize = (e) => e.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const hasChanges = JSON.stringify([...originalEmails].sort()) !== JSON.stringify([...allowedEmails].sort());

  const loadEmails = useCallback(async () => {
    setLoading(true);
    setError('');
    // Try server API first (ensures file sync), fallback to Firestore direct read
    try {
      const resp = await fetch(`${API_BASE}/api/allowed-emails`);
      if (resp.ok) {
        const data = await resp.json();
        const list = (data.emails || []).slice().sort();
        setAllowedEmails(list);
        setOriginalEmails(list);
        setLoading(false);
        return;
      }
    } catch (_) {
      // ignore and fallback
    }
    try {
      const snap = await getDocs(collection(db, 'allowedEmails'));
      const list = [];
      snap.forEach(d => list.push(d.id));
      list.sort();
      setAllowedEmails(list);
      setOriginalEmails(list);
    } catch (e) {
      console.error(e);
      setError('Failed to load emails');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadEmails(); }, [loadEmails]);

  function addEmail() {
    const email = normalize(newEmail);
    if (!email) return;
    if (!emailRegex.test(email)) { setError('Invalid email format'); return; }
    if (allowedEmails.includes(email)) { setError('Email already exists'); return; }
    setAllowedEmails(prev => [...prev, email].sort());
    setNewEmail('');
    setError('');
  }

  function startEdit(index) {
    setEditingIndex(index);
    setEditingEmail(allowedEmails[index]);
  }
  function cancelEdit() {
    setEditingIndex(-1);
    setEditingEmail('');
  }
  function saveEdit() {
    const updated = normalize(editingEmail);
    if (!updated) return;
    if (!emailRegex.test(updated)) { setError('Invalid email format'); return; }
    if (allowedEmails.some((e,i)=> e===updated && i!==editingIndex)) { setError('Email already exists'); return; }
    setAllowedEmails(prev => {
      const clone = [...prev];
      clone[editingIndex] = updated;
      return clone.sort();
    });
    cancelEdit();
  }
  function removeEmail(index) {
    setAllowedEmails(prev => prev.filter((_, i) => i !== index));
  }

  async function saveChanges() {
    setSaving(true);
    setError('');
    setInfo('');
    try {
      const resp = await fetch(`${API_BASE}/api/allowed-emails`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: allowedEmails })
      });
      if (!resp.ok) {
        const errData = await resp.json().catch(()=>({}));
        throw new Error(errData.error || 'Request failed');
      }
      const data = await resp.json();
      const list = (data.emails || []).slice().sort();
      setAllowedEmails(list);
      setOriginalEmails(list);
      setInfo('Changes saved');
      setTimeout(()=> setInfo(''), 3000);
    } catch (e) {
      console.error(e);
      setError(e.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  }

  const onBack = () => navigate('/home');

  return (
    <GlobalLayout onLogout={onLogout}>
      <div className="max-w-5xl mx-auto space-y-10">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Admin Settings</h1>
          <p className="text-blue-200 text-lg">Manage application configuration and volunteer access here.</p>
        </div>

        {/* Email Management Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Allowed Email Addresses</h2>
            <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 backdrop-blur-sm">
              {loading ? 'Loading…' : `${allowedEmails.length} emails`}
            </Badge>
          </div>

          {/* Add New Email */}
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <Label htmlFor="newEmail" className="text-white mb-2 block">Add New Email</Label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="pl-12 bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                  placeholder="volunteer@example.com"
                  onKeyDown={(e) => e.key === 'Enter' && addEmail()}
                  aria-label="Email address"
                />
              </div>
              <Button 
                onClick={addEmail}
                disabled={!newEmail.trim() || allowedEmails.includes(normalize(newEmail)) || !emailRegex.test(normalize(newEmail))}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
            {newEmail && !emailRegex.test(normalize(newEmail)) && (
              <p className="text-xs text-red-300 mt-2">Invalid email format</p>
            )}
          </div>

          {/* Email List */}
          {loading ? (
            <div className="text-blue-200 py-8 text-center">Loading emails…</div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {allowedEmails.map((email, index) => (
                <div key={email} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  {editingIndex === index ? (
                    <div className="flex-1 flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-300 flex-shrink-0" />
                      <Input
                        type="email"
                        value={editingEmail}
                        onChange={(e) => setEditingEmail(e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        aria-label="Edit email"
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={saveEdit}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          aria-label="Save email edit"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          className="border-white/30 text-white hover:bg-white/10"
                          aria-label="Cancel email edit"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-300" />
                        <span className="text-white break-all">{email}</span>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(index)}
                          className="border-white/30 text-white hover:bg-white/10"
                          aria-label={`Edit ${email}`}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => removeEmail(index)}
                          className="border-red-400/30 text-red-300 hover:bg-red-500/10 hover:border-red-400/50"
                          aria-label={`Remove ${email}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {allowedEmails.length === 0 && (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                  <p className="text-blue-200">No email addresses configured</p>
                  <p className="text-blue-300 text-sm mt-2">Add email addresses above to grant volunteer access.</p>
                </div>
              )}
            </div>
          )}

          {/* Status Messages */}
          {error && <div className="mt-4 text-sm text-red-300">{error}</div>}
          {info && <div className="mt-4 text-sm text-green-300">{info}</div>}
        </div>

        {/* Save Changes Banner */}
        {hasChanges && (
          <div className="bg-orange-500/10 backdrop-blur-lg rounded-xl border border-orange-400/20 p-4 mb-4">
            <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-orange-300" />
                <div>
                  <h3 className="text-white font-medium">Unsaved Changes</h3>
                  <p className="text-orange-200 text-sm">You have unsaved changes to the email list</p>
                </div>
              </div>
              <Button 
                onClick={saveChanges}
                disabled={saving}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/50 transition-all duration-300 group"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </div>
      </div>
    </GlobalLayout>
  );
}
